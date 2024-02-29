from django.contrib import messages
from django.middleware.csrf import get_token
from django.urls import reverse
from django.shortcuts import get_object_or_404
from meze.decorators import meze_view
from meze.response import MezeCloseOverlayResponse, MezeResponse

from .forms import PostForm
from .models import Post


@meze_view
def index(request):
    posts = Post.objects.all()

    return MezeResponse(
        request,
        "PostIndex",
        {
            "posts": [
                {"title": post.title, "edit_url": reverse("posts_edit", args=[post.id])}
                for post in posts
            ]
        },
        title="Posts | Mezepress",
    )


@meze_view
def add(request):
    form = PostForm(request.POST or None)

    if form.is_valid():
        post = form.save()

        messages.success(
            request,
            f"Successfully added post '{post.title}'.",
        )

        return MezeCloseOverlayResponse(request)

    return MezeResponse(
        request,
        "PostForm",
        {
            "csrf_token": get_token(request),
            "action_url": reverse("posts_add"),
            "form": form,
        },
        overlay=True,
        title="Add Post | Mezepress",
    )


@meze_view
def edit(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    form = PostForm(request.POST or None, instance=post)

    if form.is_valid():
        form.save()

    return MezeResponse(
        request,
        "PostForm",
        {
            "form": form,
        },
    )


@meze_view
def delete(request, post_id):
    post = get_object_or_404(Post, id=post_id)

    return MezeResponse(
        request,
        "CommonConfirmDelete",
        {},
    )
