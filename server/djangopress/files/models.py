from pathlib import PurePath

from django.conf import settings
from django.db import models
from django.urls import reverse
from uuid_extensions import uuid7

from djangopress.spaces.models import Space


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


class File(models.Model):
    """
    A file in the media library
    """
    id = models.UUIDField(primary_key=True, default=uuid7)
    space = models.ForeignKey(Space, on_delete=models.CASCADE, related_name="files")
    path = models.TextField()
    blob = models.ForeignKey(Blob, on_delete=models.CASCADE, related_name="files")

    class Meta:
        db_table = "djangopress_file"
        unique_together = [("space", "path")]

    @property
    def name(self):
        return PurePath(self.path).name

    def __str__(self):
        return self.path

    def to_client_representation(self):
        path = PurePath(self.path)

        # Get all artifacts with their status
        artifacts_status = {}
        blobs = {
            "original": self.blob.to_client_representation(
                reverse(
                    "file_download",
                    args=[self.space.slug, "original", self.path],
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
                        args=[self.space.slug, artifact.name, self.name],
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
            "detail_url": reverse("file_detail", args=[self.space.slug, self.id]),
        }


class Artifact(models.Model):
    """
    A file derived from another file.

    For example:
    - Image Thumbnails
    - Audio transcriptions
    - Video transcodes
    """
    file = models.ForeignKey(File, on_delete=models.CASCADE, related_name="artifacts")
    name = models.CharField(max_length=255)
    instance = models.CharField(max_length=255, blank=True)
    blob = models.ForeignKey(Blob, on_delete=models.CASCADE, related_name="artifacts")
    created_at = models.DateTimeField(auto_now_add=True)
    generated_at = models.DateTimeField(null=True)

    class Meta:
        db_table = "djangopress_artifact"
        unique_together = [("file", "name", "instance")]
