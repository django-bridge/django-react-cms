from django.db import models
from django.contrib.contenttypes.models import ContentType


class Space(models.Model):
    name = models.CharField(max_length=255)


class SpaceMember(models.Model):
    space = models.ForeignKey(Space, on_delete=models.CASCADE)
    user = models.ForeignKey("djangopress.auth.User", on_delete=models.CASCADE)

    class Meta:
        unique_together = [("space", "user")]


class Channel(models.Model):
    name = models.CharField(max_length=255)
    space = models.ForeignKey(Space, on_delete=models.CASCADE, related_name="channels")
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
