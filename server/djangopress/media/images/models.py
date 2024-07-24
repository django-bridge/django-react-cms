from django.db import models

from djangopress.models import Content, BaseFile
from djangopress.media.models import MediaAsset


class ImageFile(BaseFile):
    """
    Represents an image file.
    """
    width = models.PositiveIntegerField()
    height = models.PositiveIntegerField()

    UPLOAD_PATH = "images"

    ALLOWED_FILE_TYPES = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
    ]


class Image(Content):
    """
    A content type for images.
    """
    file = models.ForeignKey(ImageFile, on_delete=models.CASCADE)

    components = [
        MediaAsset,
    ]
