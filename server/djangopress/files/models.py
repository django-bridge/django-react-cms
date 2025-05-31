from pathlib import PurePath

from django.conf import settings
from django.db import models
from django.urls import reverse
from uuid_extensions import uuid7

from djangopress.content.models import Content

__all__ = ["Blob", "File", "Artifact"]


class Blob(models.Model):
    """
    Handles large binary objects that are stored outside of the database.
    """

    uuid = models.UUIDField(primary_key=True, default=uuid7)
    size = models.PositiveBigIntegerField()
    hash = models.CharField(max_length=40, null=True)
    mime_type = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    metadata = models.JSONField(null=True, blank=True)

    class Meta:
        db_table = "djangopress_blob"

    def get_storage_path(self):
        return settings.MEDIA_ROOT / str(self.uuid)

    def open(self, mode="rb"):
        return open(self.get_storage_path(), mode)

    def to_client_representation(self, download_url):
        return {
            "size": self.total_size,
            "mime_type": self.mime_type,
            "metadata": self.metadata,
            "download_url": download_url,
        }


class BaseFile(Content):
    """
    Base class for all files in the media library.
    """

    blob = models.ForeignKey(Blob, on_delete=models.CASCADE, related_name="+")

    class Meta:
        abstract = True

    def __str__(self):
        return self.name

    def to_client_representation(self):
        path = PurePath(self.name)

        # Get all artifacts with their status
        artifacts_status = {}
        blobs = {
            "original": self.blob.to_client_representation(
                reverse(
                    "file_download",
                    args=[self.workspace.slug, "original", self.name],
                )
            )
        }

        for artifact in self.artifacts.all():
            artifacts_status[artifact.name] = artifact.status

            # Only include completed artifacts with blobs in the blobs dict
            if artifact.status == Artifact.Status.COMPLETED and artifact.blob:
                blobs[artifact.name] = artifact.blob.to_client_representation(
                    reverse(
                        "file_download",
                        args=[self.workspace.slug, artifact.name, self.name],
                    )
                )

        return {
            "id": self.id,
            "name": {
                "folder": str(path.parent),
                "stem": str(path.stem),
                "extension": str(path.suffix),
            },
            "blobs": blobs,
            "artifacts_status": artifacts_status,
            "adjustments": self.adjustments or {},
            "detail_url": reverse("file_detail", args=[self.workspace.slug, self.id]),
        }


class File(BaseFile):
    """
    A generic file that doesn't fit into a specific category.
    """

    class Meta:
        db_table = "djangopress_file"


class Image(BaseFile):
    class Meta:
        db_table = "djangopress_image"


class Document(BaseFile):
    class Meta:
        db_table = "djangopress_document"


class Video(BaseFile):
    class Meta:
        db_table = "djangopress_video"


class Audio(BaseFile):
    class Meta:
        db_table = "djangopress_audio"


class Artifact(models.Model):
    """
    A file that has been derived from a piece of content.

    For example:
    - Image thumbnails
    - Audio transcriptions
    - PDF extracted text
    - Page text-to-speech
    """

    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        PROCESSING = "processing", "Processing"
        COMPLETED = "completed", "Completed"
        FAILED = "failed", "Failed"

    content = models.ForeignKey(
        Content, on_delete=models.CASCADE, related_name="artifacts"
    )
    name = models.CharField(max_length=255)
    blob = models.ForeignKey(
        Blob, on_delete=models.CASCADE, related_name="artifacts", null=True, blank=True
    )
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING,
    )
    error_message = models.TextField(null=True, blank=True)

    class Meta:
        unique_together = [("content", "name")]
        db_table = "djangopress_artifact"

    def __str__(self):
        return f"{self.file.name} - {self.name}"
