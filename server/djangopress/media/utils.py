import math
from io import BytesIO
from PIL import Image


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
