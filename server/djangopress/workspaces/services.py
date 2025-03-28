from .models import Workspace, WorkspaceMember

from djangopress.auth.models import User


def create_workspace(*, name: str, owner: User) -> Workspace:
    workspace = Workspace.objects.create(name=name)
    WorkspaceMember.objects.create(workspace=workspace, user=owner)
    return workspace
