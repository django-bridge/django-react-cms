from django.contrib.contenttypes.models import ContentType
from django.contrib import messages
from django_render.response import Response, CloseOverlayResponse
from django.urls import reverse
from django.shortcuts import get_object_or_404

from .forms import ImageForm
from .models import MediaAsset, Image


def index(request):
    assets = MediaAsset.objects.filter(owner=request.user)

    return Response(
        request,
        "MediaIndex",
        {
            "assets": [
                {
                    "id": asset.id,
                    "title": asset.title,
                    "edit_url": reverse("media_edit", args=[asset.id]),
                    "thumbnail_url": asset.thumbnail.file.url if asset.thumbnail else None,
                }
                for asset in assets
            ]
        },
        title="Media | Djangopress",
    )


def add_image(request):
    form = ImageForm(request.POST or None, request.FILES or None)

    if form.is_valid():
        try:
            image = form.save(commit=False)
            image._set_file_metadata(request.FILES["file"])
            image.owner = request.user
            image.media_type = ContentType.objects.get_for_model(Image)
            image.generate_thumbnail()
            image.save()

            messages.success(
                request,
                f"Successfully added image '{image.title}'.",
            )

            return CloseOverlayResponse(request)

        except Image.InvalidFileError as e:
            form.add_error("file", e.args[0])

    return Response(
        request,
        "MediaForm",
        {
            "title": "Add image",
            "submit_button_label": "Add image",
            "action_url": reverse("media_add_image"),
            "form": form,
        },
        overlay=True,
        title="Add Image | Djangopress",
    )


def edit(request, mediaasset_id):
    # TODO: Check media type
    image = get_object_or_404(Image, owner=request.user, id=mediaasset_id)
    form = ImageForm(request.POST or None, instance=image)

    if form.is_valid():
        form.save()

    return Response(
        request,
        "MediaForm",
        {
            "title": "Edit Image",
            "submit_button_label": "Save",
            "action_url": reverse("media_edit", args=[mediaasset_id]),
            "form": form,
        },
        overlay=True,
        title=f"Editing {image.title} | Djangopress",
    )


def delete(request, mediaasset_id):
    asset = get_object_or_404(MediaAsset, owner=request.user, id=mediaasset_id)

    if request.method == "POST":
        asset.delete()

        messages.success(
            request,
            f"Successfully deleted asset '{post.title}'.",
        )

        return CloseOverlayResponse(request)

    return Response(
        request,
        "ConfirmDelete",
        {
            "objectName": asset.title,
            "messageHtml": "Are you sure that you want to delete this asset?",
            "actionUrl": reverse("posts_delete", args=[post.id]),
        },
        overlay=True,
    )
