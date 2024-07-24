from django.db import models

from djangopress.models import Content, BaseFile
from djangopress.media.models import MediaAsset


class VideoFile(BaseFile):
    """
    Represents a video file.
    """
    width = models.PositiveIntegerField()
    height = models.PositiveIntegerField()
    duration = models.DurationField()
    has_audio = models.BooleanField()

    UPLOAD_PATH = "videos"

    ALLOWED_FILE_TYPES = [
        "video/mp4",
        "video/webm",
        "video/ogg",
    ]


class Video(Content):
    """
    A content type for video files.
    """
    file = models.ForeignKey(VideoFile, on_delete=models.CASCADE)

    components = [
        MediaAsset,
    ]

