from django.db import models

from djangopress.auth.models import User


__all__ = ["Space", "SpaceUser"]


class Space(models.Model):
    name = models.TextField()
    slug = models.SlugField()
    users = models.ManyToManyField(User, through="SpaceUser", related_name="spaces")

    class Meta:
        db_table = "djangopress_space"


class SpaceUser(models.Model):
    space = models.ForeignKey(Space, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        db_table = "djangopress_spaceuser"
