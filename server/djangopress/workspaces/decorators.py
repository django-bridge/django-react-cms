from functools import wraps
from django.shortcuts import get_object_or_404

from djangopress.workspaces.models import Workspace


def workspace_view(fn):
    @wraps(fn)
    def wrapper(request, workspace_slug, *args, **kwargs):
        request.workspace = get_object_or_404(
            Workspace.objects.for_user(request.user), slug=workspace_slug
        )

        return fn(request, *args, **kwargs)

    return wrapper
