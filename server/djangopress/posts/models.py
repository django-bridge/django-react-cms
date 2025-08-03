from django.db import models
from modelsearch import index
from modelsearch.queryset import SearchableQuerySetMixin

from djangopress.auth.models import User


class PostQuerySet(SearchableQuerySetMixin, models.QuerySet):
    pass


class Post(index.Indexed, models.Model):
    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        PUBLISHED = "published", "Published"

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.TextField()
    status = models.CharField(max_length=9, choices=Status.choices)
    content = models.JSONField()

    objects = PostQuerySet.as_manager()

    search_fields = [
        index.SearchField("title", boost=3.0),
        index.SearchField("content"),
        index.FilterField("owner"),
        index.FilterField("status"),
    ]

    def __str__(self):
        return self.title
