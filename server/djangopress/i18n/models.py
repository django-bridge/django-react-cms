
# class Locale(models.Model):
#     space = models.ForeignKey(Space, on_delete=models.CASCADE, related_name="locales")
#     language_code = models.TextField(unique=True)

#     class Meta:
#         unique_together = [("space", "language_code")]
#         db_table = "djangopress_locale"

# class TranslatableMixin(models.Model):
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
#
#
#   class Meta:
#       abstract=True
        # TODO: Add check constraint on translation_of
        # translation_of must be unique for each locale.
        # If translation_of is None, then the uuid of the current instance is used instead
