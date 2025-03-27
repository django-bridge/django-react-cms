from .models import Space, SpaceMember

from djangopress.auth.models import User


def create_space(*, name: str, owner: User) -> Space:
    space = Space.objects.create(name=name)
    SpaceMember.objects.create(space=space, user=owner)
    return space
