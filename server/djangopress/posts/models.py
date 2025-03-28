from django.db import models

from djangopress.auth.models import User
from djangopress.spaces.models import Workspace


class Post(models.Model):
    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        PUBLISHED = "published", "Published"

    workspace = models.ForeignKey(
        Workspace,
        on_delete=models.CASCADE,
        related_name="posts",
        null=True
    )
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.TextField()
    status = models.CharField(max_length=9, choices=Status.choices)
    content = models.JSONField()
