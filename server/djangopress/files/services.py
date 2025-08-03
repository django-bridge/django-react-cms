from pathlib import Path

import filetype
from django.conf import settings
from django.contrib.contenttypes.models import ContentType

from .models import Blob, File
from .utils import hash_filelike


def create_file(*, name, size, uploaded_file, user, space):
    # validate file size, reject files larger than MAX_UPLOAD_SIZE
    # FIXME: Handle exception and display error to user
    if size > settings.MAX_UPLOAD_SIZE:
        raise ValueError("File size is too large.")

    # validate file type, reject files not in ALLOWED_FILE_TYPES
    mime_type = filetype.guess_mime(uploaded_file)

    if mime_type is None:
        content_type = "application/octet-stream"

    blob = Blob.objects.create(
        size=size,
        hash=hash_filelike(uploaded_file),
        mime_type=mime_type,
        created_by=user,
    )

    # Write the data
    with blob.open("wb") as f:
        f.write(uploaded_file.read())

    # Check if file name is in use, append number to resolve conflict
    file_suffix = Path(name).suffix
    file_prefix = name[: -len(file_suffix)]

    conflicting_filenames = set(
        File.objects.filter(
            name__startswith=file_prefix, name__endswith=file_suffix
        ).values_list("name", flat=True)
    )

    if name in conflicting_filenames:
        for i in range(1, 100):
            test_name = f"{file_prefix} ({i}){file_suffix}"
            if f"{file_prefix} ({i}){file_suffix}" not in conflicting_filenames:
                name = test_name
                break

        if name in conflicting_filenames:
            raise ValueError("Unable to resolve name conflict")

    content_type = ContentType.objects.get_for_model(model)
    return File.objects.create(
        space=space, content_type=content_type, name=name, blob=blob
    )
