from django.db import models
from django.contrib.contenttypes.models import ContentType as DjangoContentType

from .workspaces import Workspace


class ContentType(models.Model):
    """
    A type of content. Such as a Page, Blog Post, or Image.
    """
    name = models.TextField(max_length=255)
    slug = models.TextField(max_length=255, unique=True)
    base = models.ForeignKey(DjangoContentType, on_delete=models.CASCADE, related_name='+')
    components = models.ManyToManyField(DjangoContentType, related_name='+')


class Content(models.Model):
    id = models.UUIDField(primary_key=True)
    workspace = models.ForeignKey(Workspace, on_delete=models.PROTECT)
    content_type = models.ForeignKey(ContentType, on_delete=models.PROTECT)
    name = models.TextField()
    is_published = models.BooleanField(default=False)


class Component(models.Model):
    content = models.OneToOneField(Content, primary_key=True)

    class Meta:
        abstract = True


class RepeatableComponent(models.Model):
    content = models.ForeignKey(Content, on_delete=models.CASCADE)
    sort_order = models.IntegerField()

    class Meta:
        abstract = True


class ScheduledAction(models.Model):
    class Action(models.TextChoices):
        publish = 'publish', 'Publish'
        unpublish = 'unpublish', 'Unpublish'

    class Status(models.TextChoices):
        pending = 'pending', 'Pending'
        completed = 'completed', 'Completed'
        cancelled = 'cancelled', 'Cancelled'

    content = models.ForeignKey(Content, on_delete=models.CASCADE, related_name='scheduled_actions')
    action = models.CharField(max_length=10, choices=Action.choices)
    complete_after = models.DateTimeField()
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.pending)
