import filetype

from django.conf import settings
from django.db import models

from djangopress.utils import hash_filelike


def get_upload_path(instance, filename):
    return f"{instance.UPLOAD_PATH}/{filename}"


class BaseFile(models.Model):
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to=get_upload_path)
    size = models.PositiveIntegerField()
    hash = models.CharField(max_length=40)
    content_type = models.CharField(max_length=100)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    uploaded_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)

    UPLOAD_PATH = "files"

    ALLOWED_FILE_TYPES = []

    class InvalidFileError(ValueError):
        pass

    def _set_metadata(self, file):
        self.size = file.size
        self.hash = hash_filelike(file)
        self.content_type = filetype.guess_mime(file)

        # validate file size, reject files larger than MAX_UPLOAD_SIZE
        if self.size > settings.MAX_UPLOAD_SIZE:
            raise self.InvalidFileError("File size is too large.")

        if self.content_type is None:
            raise self.InvalidFileError("The file type could not be determined.")

        if self.content_type not in self.ALLOWED_FILE_TYPES:
            raise self.InvalidFileError(
                f"File type '{self.file_content_type}' is not supported."
            )

    class Meta:
        abstract = True
