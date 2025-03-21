from django.db import models

from djangopress.models import Channel


class WebSite(Channel):
    domain_name = models.CharField(max_length=255)
    base_path = models.CharField(max_length=255, blank=True)
