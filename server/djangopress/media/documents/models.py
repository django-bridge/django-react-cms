from django.db import models

from djangopress.models import Content, BaseFile
from djangopress.media.models import MediaAsset


class DocumentFile(BaseFile):
    """
    Represents a document file.
    """
    UPLOAD_PATH = "documents"

    ALLOWED_FILE_TYPES = [
        "application/pdf",
        "application/msword",
        "application/vnd.oasis.opendocument.text",
    ]


class Document(Content):
    """
    A content type for documents.
    """
    file = models.ForeignKey(DocumentFile, on_delete=models.CASCADE)

    components = [
        MediaAsset,
    ]
