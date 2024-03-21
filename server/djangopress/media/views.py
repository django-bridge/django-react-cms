from django.contrib.contenttypes.models import ContentType
from djangorender.decorators import djangorender_view
from djangorender.response import Response

from .forms import ImageForm
from .models import MediaAsset


@djangorender_view
def index(request):
    assets = MediaAsset.objects.all()

    return Response(
        request,
        "MediaIndex",
        {
            "assets": [
                {
                    "title": asset.title,
                    "edit_url": reverse("media_edit", args=[post.id]),
                }
                for asset in assets
            ]
        },
        title="Media | Djangopress",
    )


@djangorender_view
def add(request):
    form = ImageForm()

    if form.is_valid():
        image = form.save(commit=False)
        image.media_type = ContentType.objects.get_for_model(Image)
        image.save()

    return Response(
        request,
        "ImageForm",
        {
            "form": form,
        },
    )


@djangorender_view
def edit(request, mediaasset_id):
    # TODO: Check media type
    image = get_object_or_404(Image, id=mediaasset_id)
    form = ImageForm()

    if form.is_valid():
        form.save()

    return Response(
        request,
        "ImageForm",
        {
            "form": form,
        },
    )


@djangorender_view
def delete(request, mediaasset_id):
    asset = get_object_or_404(MediaAsset, id=mediaasset_id)

    return Response(
        request,
        "CommonConfirmDelete",
        {},
    )
