from django.db import models

from djangopress.auth.models import User


class Channel(models.Model):
    pass


class Posting(RepeatableComponent):
    """
    Represents the posting of a piece of content to a channel
    """
    channel = models.ForeignKey(Channel)
    posted_at = models.DateTimeField()

    # If the provider supports reposting, the content may be posted to multiple
    # channels of that provider with one being the canonical, and others being reposts
    repost_of = models.ForeignKey(Posting)


class Article(Component):
    title = models.TextField()
    content = models.JSONField()
