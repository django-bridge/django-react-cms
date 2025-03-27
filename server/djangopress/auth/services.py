import string

from django.utils.crypto import get_random_string

from .models import User


def create_temporary_user():
    return User.objects.create(
        username="temp-" + get_random_string(10, allowed_chars=string.ascii_lowercase),
        is_temporary=True,
    )
