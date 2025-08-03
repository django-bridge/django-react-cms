from pathlib import Path

import filetype
from django.conf import settings

from .models import Blob, File
from .utils import hash_filelike


def create_file(*, path, size, uploaded_file, user, space):
    # validate file size, reject files larger than MAX_UPLOAD_SIZE
    # FIXME: Handle exception and display error to user
    if size > settings.MAX_UPLOAD_SIZE:
        raise ValueError("File size is too large.")

    blob = Blob.objects.create(
        size=size,
        hash=hash_filelike(uploaded_file),
        mime_type=filetype.guess_mime(uploaded_file) or "application/octet-stream",
        created_by=user,
    )

    # Write the data
    with blob.open("wb") as f:
        f.write(uploaded_file.read())

    # Check if file path is in use, append number to resolve conflict
    file_suffix = Path(path).suffix
    file_prefix = path[: -len(file_suffix)]

    conflicting_filepaths = set(
        File.objects.filter(
            space=space, path__startswith=file_prefix, path__endswith=file_suffix
        ).values_list("path", flat=True)
    )

    if path in conflicting_filepaths:
        for i in range(1, 100):
            test_path = f"{file_prefix} ({i}){file_suffix}"
            if f"{file_prefix} ({i}){file_suffix}" not in conflicting_filepaths:
                path = test_path
                break

        if path in conflicting_filepaths:
            raise ValueError("Unable to resolve path conflict")

    return File.objects.create(space=space, path=path, blob=blob)
