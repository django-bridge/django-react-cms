from django.db import models

from djangopress.models import Content, BaseFile


class ImageFile(BaseFile):
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
    file = models.ForeignKey(ImageFile, on_delete=models.CASCADE)


class DocumentFile(BaseFile):
    UPLOAD_PATH = "documents"

    ALLOWED_FILE_TYPES = [
        "application/pdf",
        "application/msword",
        "application/vnd.oasis.opendocument.text",
    ]


class Document(Content):
    file = models.ForeignKey(DocumentFile, on_delete=models.CASCADE)


class AudioFile(BaseFile):
    duration = models.DurationField()

    UPLOAD_PATH = "audio"

    ALLOWED_FILE_TYPES = [
        "audio/mpeg",
        "audio/ogg",
        "audio/wav",
    ]


class Audio(Content):
    file = models.ForeignKey(AudioFile, on_delete=models.CASCADE)


class VideoFile(BaseFile):
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
    file = models.ForeignKey(VideoFile, on_delete=models.CASCADE)
