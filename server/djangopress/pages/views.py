from django.contrib import messages
from django.urls import reverse
from django.shortcuts import get_object_or_404
from django.utils.text import slugify
from django_bridge.response import CloseOverlayResponse, Response

from .forms import PageForm
from .models import Page, PageContentType


def index(request):
    pages = Page.objects.filter(space=request.space)

    return Response(
        request,
        "PagesIndex",
        {
            "pages": [
                {
                    "title": page.title,
                    "edit_url": reverse(
                        "pages_edit", args=[request.space.slug, str(page.id)]
                    ),
                    "delete_url": reverse(
                        "pages_delete", args=[request.space.slug, str(page.id)]
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
        # TODO: Make it possible to define custom types
        page.content_type, _ = PageContentType.objects.get_or_create(
            space=request.space,
            name="Post",
            defaults={
                "schema": {
                    "fields": [
                        {"name": "title", "type": "text"},
                        {
                            "name": "content",
                            "type": "rich_text",
                            "title_field": "title",
                        },
                    ]
                }
            },
        )
        page.space = request.space
        page.content = {
            "fields": {
                "title": form.cleaned_data["title"],
                "content": form.cleaned_data["content"],
            }
        }
        page.title = form.cleaned_data["title"]
        page.path = slugify(page.title)
        page.save()

        messages.success(
            request,
            f"Successfully added page '{page.title}'.",
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


def edit(request, page_id):
    page = get_object_or_404(Page, space=request.space, id=page_id)
    form = PageForm(
        request.POST or None,
        initial={
            "title": page.content["fields"]["title"],
            "content": page.content["fields"]["content"],
        },
    )

    if form.is_valid():
        page.content = {
            "fields": {
                "title": form.cleaned_data["title"],
                "content": form.cleaned_data["content"],
            }
        }
        page.title = form.cleaned_data["title"]
        page.save()

        messages.success(
            request,
            f"Successfully saved page '{page.title}'.",
        )

    return Response(
        request,
        "PageForm",
        {
            "page": {
                "title": page.title,
                "edit_url": reverse(
                    "pages_edit", args=[request.space.slug, str(page.id)]
                ),
                "delete_url": reverse(
                    "pages_delete", args=[request.space.slug, str(page.id)]
                ),
            },
            "action_url": reverse(
                "pages_edit", args=[request.space.slug, str(page.id)]
            ),
            "form": form,
        },
    )


def delete(request, page_id):
    page = get_object_or_404(Page, space=request.space, id=page_id)

    if request.method == "POST":
        page.delete()

        messages.success(
            request,
            f"Successfully deleted page '{page.title}'.",
        )

        return CloseOverlayResponse(request)

    return Response(
        request,
        "ConfirmDelete",
        {
            "objectName": page.title,
            "messageHtml": "Are you sure that you want to delete this page?",
            "actionUrl": reverse(
                "pages_delete", args=[request.space.slug, str(page.id)]
            ),
        },
        overlay=True,
    )
