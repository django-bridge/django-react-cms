import math
from hashlib import sha1
from io import BytesIO, UnsupportedOperation
from PIL import Image

from django.utils.encoding import force_bytes


def generate_thumbnail(file, target_width, target_height):
    with Image.open(file) as image:
        source_width, source_height = image.size

        # Crop the image to fit the final aspect ratio
        target_aspect_ratio = target_width / target_height
        crop_width = min(source_width, source_height * target_aspect_ratio)
        crop_height = crop_width / target_aspect_ratio
        crop_left = int(math.floor(source_width / 2 - crop_width / 2))
        crop_top = int(math.floor(source_height / 2 - crop_height / 2))
        crop_right = int(math.ceil(source_width / 2 + crop_width / 2))
        crop_bottom = int(math.ceil(source_height / 2 + crop_height / 2))
        image = image.crop((crop_left, crop_top, crop_right, crop_bottom))

        # Resize the image (if it is big enough)
        scale = target_width / crop_width
        if scale < 1.0:
            image = image.resize((target_width, target_height))

        # Replace transparent background with white
        if image.mode in ("RGBA", "LA") or (
            image.mode == "P" and "transparency" in image.info
        ):
            new_image = new_image = Image.new(
                "RGBA", image.size, (255, 255, 255, 255)
            )
            new_image.alpha_composite(image.convert("RGBA"))
            image = new_image

        image = image.convert("RGB")
        out = BytesIO()
        image.save(out, "JPEG", quality=85, progressive=True)
        return out


HASH_READ_SIZE = 65536  # 64k


# Copied from https://github.com/wagtail/wagtail/blob/main/wagtail/utils/file.py
def hash_filelike(filelike):
    """
    Compute the hash of a file-like object, without loading it all into memory.
    """
    file_pos = 0
    if hasattr(filelike, "tell"):
        file_pos = filelike.tell()

    try:
        # Reset file handler to the start of the file so we hash it all
        filelike.seek(0)
    except (AttributeError, UnsupportedOperation):
        pass

    hasher = sha1()
    while True:
        data = filelike.read(HASH_READ_SIZE)
        if not data:
            break
        # Use `force_bytes` to account for files opened as text
        hasher.update(force_bytes(data))

    if hasattr(filelike, "seek"):
        # Reset the file handler to where it was before
        filelike.seek(file_pos)

    return hasher.hexdigest()
