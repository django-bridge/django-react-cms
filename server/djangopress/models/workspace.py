from django.db import models


class Workspace(models.Model):
    """
    A workspace that provides isolation for multiple tenants.
    """
    name = models.TextField(max_length=50)
    slug = models.TextField(max_length=50, unique=True)
