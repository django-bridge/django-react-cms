from django.db import models
from uuid_extensions import uuid7

from djangopress.spaces.models import Space


__all__ = ["PageContentType", "Page"]


class PageContentType(models.Model):
    space = models.ForeignKey(
        Space, on_delete=models.CASCADE, related_name="page_content_types"
    )
    name = models.TextField()
    version = models.PositiveIntegerField(default=1)
    schema = models.JSONField()

    # Fields for migrating to next content type
    # When a new version of the content type is created,
    # or this content type is merged into another,
    # the migration_target is set to the content type
    # all instances of this type will be converted to and
    # migration_operations is set to a list of operations
    # to convert content of this type to the target type.
    migration_target = models.ForeignKey(
        "self",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="+"
    )
    migration_operations = models.JSONField(null=True, blank=True)

    class Meta:
        db_table = "djangopress_pagecontenttype"
        unique_together = [("space", "name", "version")]

    def __str__(self):
        return self.name


class Page(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid7)
    space = models.ForeignKey(Space, on_delete=models.CASCADE, related_name="pages")
    path = models.TextField()
    content_type = models.ForeignKey(
        PageContentType,
        on_delete=models.CASCADE,
        related_name="pages",
    )
    content = models.JSONField()
    title = models.TextField()

    class Meta:
        db_table = "djangopress_page"
        unique_together = [("space", "path")]

    def __str__(self):
        return self.title
