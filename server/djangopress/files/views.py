from django.contrib import messages
from django_bridge.response import Response, CloseOverlayResponse
from django.urls import reverse
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.http import require_POST

from .models import File
from .services import create_file


def index(request):
    files = File.objects.filter(space=request.space)

    return Response(
        request,
        "FilesIndex",
        {
            "files": [
                {
                    "id": str(file.id),
                    "name": file.name,
                    "detail_url": reverse(
                        "files_edit", args=[request.space.slug, str(file.id)]
                    ),
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
        path=file.name,
        size=file.size,
        uploaded_file=file,
        user=request.user,
        space=request.space,
    )

    return JsonResponse(
        {
            "id": file.id,
        }
    )


def edit(request, file_id):
    file = get_object_or_404(File, space=request.space, id=file_id)

    return Response(
        request,
        "FileDetail",
        {
            "title": file.name,
        },
        overlay=True,
        title=f"Editing {file.name} | Djangopress",
    )


def delete(request, file_id):
    file = get_object_or_404(File, space=request.space, id=file_id)

    if request.method == "POST":
        file.delete()

        messages.success(
            request,
            f"Successfully deleted asset '{file.title}'.",
        )

        return CloseOverlayResponse(request)

    return Response(
        request,
        "ConfirmDelete",
        {
            "objectName": file.title,
            "messageHtml": "Are you sure that you want to delete this asset?",
            "actionUrl": reverse("posts_delete", args=[file.id]),
        },
        overlay=True,
    )
