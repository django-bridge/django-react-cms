from django.contrib import messages
from django.urls import reverse
from django.shortcuts import get_object_or_404
from django_bridge.response import CloseOverlayResponse, Response

def delete(request, object_type, object_id):
    database_object = get_object_or_404(object_type, owner=request.user, id=object_id)

    if request.method == "POST":
        database_object.delete()

        messages.success(
            request,
            f"Successfully deleted asset '{post.title}'.",
        )

        return CloseOverlayResponse(request)

    return Response(
        request,
        "ConfirmDelete",
        {
            "objectName": database_object.title,
            "messageHtml": "Are you sure that you want to delete this asset?",
            "actionUrl": reverse("posts_delete", args=[post.id]),
        },
        overlay=True,
    )
