from django.db import models


class Post(models.Model):
    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        PUBLISHED = "published", "Published"

    title = models.TextField()
    status = models.CharField(max_length=9, choices=Status.choices)
    content = models.TextField()
