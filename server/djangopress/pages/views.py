from django.contrib import messages
from django.contrib.contenttypes.models import ContentType
from django.urls import reverse
from django.shortcuts import get_object_or_404
from django_bridge.response import CloseOverlayResponse, Response

from .forms import PageForm
from .models import Page


def index(request):
    pages = Page.objects.filter(space=request.space)

    return Response(
        request,
        "PagesIndex",
        {
            "pages": [
                {
                    "name": page.name,
                    "edit_url": reverse(
                        "pages_edit", args=[request.space.slug, str(page.uuid)]
                    ),
                    "delete_url": reverse(
                        "pages_delete", args=[request.space.slug, str(page.uuid)]
                    ),
                }
                for page in pages
            ],
            "add_page_url": reverse("pages_add", args=[request.space.slug]),
        },
        title="Pages | Djangopress",
    )


def add(request):
    form = PageForm(request.POST or None)

    if form.is_valid():
        page = form.save(commit=False)
        page.content_type, _ = PageContentType.objects.get_or_create(name="Post", schema={"fields": {"name": "title", "type": "text", "name": "content", "type": "rich_text"}})
        page.space = request.space
        page.content = {
            "fields": {
                "title": form.cleaned_data["title"],
                "content": form.cleaned_data["content"],
            }
        }
        page.save()

        messages.success(
            request,
            f"Successfully added page '{page.name}'.",
        )

        return CloseOverlayResponse(request)

    return Response(
        request,
        "PageForm",
        {
            "action_url": reverse("pages_add", args=[request.space.slug]),
            "form": form,
        },
        overlay=True,
        title="Add Page | Djangopress",
    )


def edit(request, page_uuid):
    page = get_object_or_404(Page, space=request.space, uuid=page_uuid)
    form = PageForm(request.POST or None, instance=page)

    if form.is_valid():
        form.save()

        messages.success(
            request,
            f"Successfully saved page '{page.name}'.",
        )

    return Response(
        request,
        "PageForm",
        {
            "page": {
                "title": page.name,
                "edit_url": reverse(
                    "pages_edit", args=[request.space.slug, str(page.uuid)]
                ),
                "delete_url": reverse(
                    "pages_delete", args=[request.space.slug, str(page.uuid)]
                ),
            },
            "action_url": reverse(
                "pages_edit", args=[request.space.slug, str(page.uuid)]
            ),
            "form": form,
        },
    )


def delete(request, page_uuid):
    page = get_object_or_404(Page, space=request.space, uuid=page_uuid)

    if request.method == "POST":
        page.delete()

        messages.success(
            request,
            f"Successfully deleted page '{page.name}'.",
        )

        return CloseOverlayResponse(request)

    return Response(
        request,
        "ConfirmDelete",
        {
            "objectName": page.name,
            "messageHtml": "Are you sure that you want to delete this page?",
            "actionUrl": reverse(
                "pages_delete", args=[request.space.slug, str(page.uuid)]
            ),
        },
        overlay=True,
    )
