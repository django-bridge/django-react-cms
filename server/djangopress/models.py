from django.db import models
from django.contrib.contenttypes.models import ContentType as DjangoContentType


class Workspace(models.Model):
    """
    A workspace that provides isolation for multiple tenants.
    """
    name = models.TextField(max_length=50)
    slug = models.TextField(max_length=50, unique=True)


class ContentType(models.Model):
    """
    A type of content. Such as a Page, Blog Post, or Image.
    """
    name = models.TextField(max_length=255)
    slug = models.TextField(max_length=255, unique=True)
    base_model = models.ForeignKey(DjangoContentType, on_delete=models.CASCADE)


class Content(models.Model):
    """
    A piece of content.
    """
    id = models.UUIDField(primary_key=True)
    workspace = models.ForeignKey(Workspace, on_delete=models.PROTECT)
    content_type = models.ForeignKey(ContentType, on_delete=models.PROTECT)
    name = models.TextField()


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
    content = models.ForeignKey(Content, on_delete=models.CASCADE, related_name='scheduled_actions')
    action = publish / unpublish
    time
    created_at
    created_by
    status = pending / completed / cancelled
