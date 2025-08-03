from django.contrib.auth.models import AbstractUser
from django.db import models


__all__ = ["User"]


class User(AbstractUser):
    is_temporary = models.BooleanField(default=False)
