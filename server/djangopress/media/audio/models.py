from django.db import models

from djangopress.models import Content, BaseFile
from djangopress.media.models import MediaAsset


class AudioFile(BaseFile):
    """
    Represents an audio file.
    """
    duration = models.DurationField()

    UPLOAD_PATH = "audio"

    ALLOWED_FILE_TYPES = [
        "audio/mpeg",
        "audio/ogg",
        "audio/wav",
    ]


class Audio(Content):
    """
    A content type for audio files.
    """
    file = models.ForeignKey(AudioFile, on_delete=models.CASCADE)

    components = [
        MediaAsset,
    ]
