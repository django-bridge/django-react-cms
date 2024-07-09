from django.db import models

from djangopress.auth.models import User


class Channel(models.Model):
    pass


class Post(models.Model):
    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        PUBLISHED = "published", "Published"

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.TextField()
    status = models.CharField(max_length=9, choices=Status.choices)
    content = models.JSONField()
