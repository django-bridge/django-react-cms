import filetype

from django.contrib.contenttypes.models import ContentType
from django.core.files.uploadedfile import UploadedFile
from django.conf import settings
from django.db import models

from djangopress.auth.models import User
from .utils import generate_thumbnail, hash_filelike


class UploadedFile(models.Model):
    file = models.FileField(upload_to="dp-assets")
    file_size = models.PositiveIntegerField()
    file_hash = models.CharField(max_length=40)
    file_content_type = models.CharField(max_length=100)
    thumbnail = models.FileField(upload_to="thumbnails", blank=True)

    class InvalidFileError(ValueError):
        pass

    def _set_file_metadata(self, file):
        self.file_size = file.size
        self.file_hash = hash_filelike(file)
        self.file_content_type = filetype.guess_mime(file)

        # validate file size, reject files larger than MAX_UPLOAD_SIZE
        if self.file_size > settings.MAX_UPLOAD_SIZE:
            raise self.InvalidFileError("File size is too large.")

        if self.file_content_type is None:
            raise self.InvalidFileError("The file type could not be determined.")

        if self.file_content_type not in self.ALLOWED_FILE_TYPES:
            raise self.InvalidFileError(
                f"File type '{self.file_content_type}' is not supported."
            )

    def generate_thumbnail(self):
        file = generate_thumbnail(self.file, 300, 300)

        self.thumbnail = Thumbnail.objects.create(
            file=UploadedFile(
                file=file,
                name=self.file.name,
                content_type="image/jpeg",
                size=file.getbuffer().nbytes
            )
        )


class MediaAsset(Component):
    file = models.ForeignKey(UploadedFile)
