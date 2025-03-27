from django.db import models
from django.contrib.contenttypes.models import ContentType


class Channel(models.Model):
    name = models.CharField(max_length=255)
    channel_type = models.ForeignKey(ContentType, on_delete=models.PROTECT, related_name="+")

    def __str__(self):
        return self.name


class Content(models.Model):
    uuid = models.UUIDField(primary_key=True)
    channel = models.ForeignKey(Channel, on_delete=models.PROTECT, related_name="content")
    admin_display_title = models.TextField()
    content = models.JSONField()

    def __str__(self):
        return self.admin_display_title
