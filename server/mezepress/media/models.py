from django.contrib.contenttypes.models import ContentType
from django.db import models


class MediaAsset(models.Model):
    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        PUBLISHED = "published", "Published"

    title = models.TextField()
    status = models.CharField(max_length=9, choices=Status.choices)
    media_type = models.ForeignKey(ContentType, on_delete=models.PROTECT)


class Image(MediaAsset):
    pass
