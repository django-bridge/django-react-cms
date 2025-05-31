from django.apps import apps
from django.contrib.contenttypes.models import ContentType
from django.contrib import messages
from django_bridge.response import Response, CloseOverlayResponse
from django.urls import reverse
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.http import require_POST

from djangopress.content.models import Content
from .models import BaseFile
from .services import create_file


def index(request):
    content_types = [
        ContentType.objects.get_for_model(model)
        for model in apps.get_models()
        if issubclass(model, BaseFile)
    ]
    files = Content.objects.filter(space=request.space, content_type__in=content_types)

    return Response(
        request,
        "FilesIndex",
        {
            "files": [
                {
                    "id": str(file.uuid),
                    "name": file.name,
                    # "edit_url": reverse(
                    #     "files_edit", args=[request.space.slug, str(file.uuid)]
                    # ),
                }
                for file in files
            ],
            "upload_url": reverse("files_upload", args=[request.space.slug]),
        },
        title="Media | Djangopress",
    )


@require_POST
def upload(request):
    file = request.FILES["file"]

    file = create_file(
        name=file.name,
        size=file.size,
        uploaded_file=file,
        user=request.user,
        space=request.space,
    )

    return JsonResponse(
        {
            "id": file.uuid,
        }
    )


def edit(request, mediaasset_id):
    image = get_object_or_404(Image, owner=request.user, id=mediaasset_id)
    form = EditForm(request.POST or None, instance=image)

    if form.is_valid():
        form.save()

        messages.success(
            request,
            f"Successfully saved image '{image.title}'.",
        )

    return Response(
        request,
        "FileDetail",
        {
            "title": "Edit Image",
            "submit_button_label": "Save",
            "action_url": reverse("files_edit", args=[mediaasset_id]),
            "form": form,
        },
        overlay=True,
        title=f"Editing {image.title} | Djangopress",
    )


def delete(request, mediaasset_id):
    asset = get_object_or_404(File, owner=request.user, id=mediaasset_id)

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
