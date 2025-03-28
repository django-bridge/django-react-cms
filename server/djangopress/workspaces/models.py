from django.db import models


class WorkspaceQuerySet(models.QuerySet):
    def for_user(self, user):
        if user.is_superuser:
            return self.all()

        return self.filter(workspacemember__user=user)


class Workspace(models.Model):
    name = models.CharField(max_length=255)

    objects = WorkspaceQuerySet.as_manager()

    def __str__(self):
        return self.name


class WorkspaceMember(models.Model):
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE)
    user = models.ForeignKey("djangopress.auth.User", on_delete=models.CASCADE)

    class Meta:
        unique_together = [("workspace", "user")]
