from django.db import models
from django.contrib.contenttypes.models import ContentType
from uuid_extensions import uuid7

from djangopress.spaces.models import Space

# Some ideas for later extensions

# 1: User defined types
# class UserDefinedType(models.Model):
#     space = models.ForeignKey(
#         Space, on_delete=models.CASCADE, related_name="user_defined_types"
#     )
#     name = models.TextField()
#     content_type = models.ForeignKey(
#         ContentType, on_delete=models.CASCADE, related_name="user_defined_types"
#     )
#     fields = models.JSONField()

#     class Meta:
#         db_table = "djangopress_udt"
#         unique_together = [("space", "name")]

# 2. Internationalisation
# class Locale(models.Model):
#     space = models.ForeignKey(Space, on_delete=models.CASCADE, related_name="locales")
#     language_code = models.TextField(unique=True)

#     class Meta:
#         unique_together = [("space", "language_code")]
#         db_table = "djangopress_locale"


class Content(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid7)
    space = models.ForeignKey(Space, on_delete=models.CASCADE, related_name="content")
    content_type = models.ForeignKey(
        ContentType, on_delete=models.CASCADE, related_name="+"
    )
    name = models.TextField()

    # User defined types
    # user_defined_type = models.ForeignKey(
    #     UserDefinedType,
    #     on_delete=models.SET_NULL,
    #     null=True,
    #     blank=True,
    #     related_name="content",
    # )
    # used_defined_content = models.JSONField(null=True)

    # Internationalisation
    # locale = models.ForeignKey(Locale, on_delete=models.CASCADE, related_name="content")
    # translation_of = models.ForeignKey(
    #     "self",
    #     on_delete=models.SET_NULL,
    #     null=True,
    #     blank=True,
    #     related_name="translations",
    # )
    # Having a separate source field allows translations to be made from other translations
    # Must be set to either the value of the translation_of field
    # or another translation of the same piece of content
    # translation_source = models.ForeignKey(
    #     "self",
    #     on_delete=models.SET_NULL,
    #     null=True,
    #     blank=True,
    #     related_name="translation_source_of",
    # )

    class Meta:
        db_table = "djangopress_content"
        unique_together = [("space", "name")]

        # TODO: Add check constraint on translation_of
        # translation_of must be unique for each locale.
        # If translation_of is None, then the uuid of the current instance is used instead


# 3. Put content links in a separate table
# So that all references between content can be easily found
# class LinkedContent(models.Model):
#     pass
