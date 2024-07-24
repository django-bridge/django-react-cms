from django.db import models

from djangopress.models import Component, RepeatableComponent


class Campaign(models.Model):
    pass


class ContentCampaign(RepeatableComponent):
    campaign = models.ForeignKey(Campaign)
