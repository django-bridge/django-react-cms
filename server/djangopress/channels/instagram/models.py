from django.db import models

from djangopress.models import Channel


class InstagramAccount(Channel):
    handle = models.CharField(max_length=255)
