from django.contrib import messages
from django.urls import reverse
from django.shortcuts import get_object_or_404
from django_bridge.response import CloseOverlayResponse, Response

from .forms import PostForm
from .models import Post
from ..common.views import delete as delete_common


def index(request):
    posts = Post.objects.filter(owner=request.user)

    return Response(
        request,
        "PostIndex",
        {
            "posts": [
                {
                    "title": post.title,
                    "edit_url": reverse("posts_edit", args=[post.id]),
                    "delete_url": reverse("posts_delete", args=[post.id]),
                }
                for post in posts
            ]
        },
        title="Posts | Djangopress",
    )


def add(request):
    form = PostForm(request.POST or None)

    if form.is_valid():
        post = form.save(commit=False)
        post.owner = request.user
        post.save()

        messages.success(
            request,
            f"Successfully added post '{post.title}'.",
        )

        return CloseOverlayResponse(request)

    return Response(
        request,
        "PostForm",
        {
            "action_url": reverse("posts_add"),
            "form": form,
        },
        overlay=True,
        title="Add Post | Djangopress",
    )


def edit(request, post_id):
    post = get_object_or_404(Post, owner=request.user, id=post_id)
    form = PostForm(request.POST or None, instance=post)

    if form.is_valid():
        form.save()

        messages.success(
            request,
            f"Successfully saved post '{post.title}'.",
        )

    return Response(
        request,
        "PostForm",
        {
            "post": {
                "title": post.title,
                "edit_url": reverse("posts_edit", args=[post.id]),
                "delete_url": reverse("posts_delete", args=[post.id]),
            },
            "action_url": reverse("posts_edit", args=[post_id]),
            "form": form,
        },
    )


def delete(request, post_id):
    delete_common(request, Post, post_id)
