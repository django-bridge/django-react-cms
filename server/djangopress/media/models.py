from django.contrib.contenttypes.models import ContentType
from django.core.files.uploadedfile import UploadedFile
from django.db import models

from .utils import generate_thumbnail


class Thumbnail(models.Model):
    file = models.FileField(upload_to="thumbnails")


def get_upload_to(instance, filename):
    return instance.upload_to + "/" + filename


class MediaAsset(models.Model):
    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        PUBLISHED = "published", "Published"

    title = models.TextField()
    status = models.CharField(max_length=9, choices=Status.choices)
    media_type = models.ForeignKey(ContentType, on_delete=models.PROTECT)
    thumbnail = models.ForeignKey(Thumbnail, on_delete=models.SET_NULL, null=True)
    file = models.FileField(upload_to=get_upload_to)


class Image(MediaAsset):
    upload_to = "images"

    def generate_thumbnail(self):
        file = generate_thumbnail(self.file, 300, 300)

        self.thumbnail = Thumbnail.objects.create(
            file=UploadedFile(
                file=file,
                name=self.file.name,
                content_type="image/jpeg",
                size=file.getbuffer().nbytes
            )
        )
