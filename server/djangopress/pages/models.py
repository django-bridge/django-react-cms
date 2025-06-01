from django.db import models

from djangopress.content.models import Content


class Page(Content):
    content = models.JSONField()

    class Meta:
        db_table = "djangopress_page"
