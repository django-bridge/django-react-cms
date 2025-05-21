from django.db import models

from djangopress.auth.models import User


class Post(models.Model):
    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        PUBLISHED = "published", "Published"
        STILL_IN_REVIEW = "stillInReview", "Still In Review"

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.TextField()
    status = models.CharField(max_length=9, choices=Status.choices)
    content = models.JSONField()
