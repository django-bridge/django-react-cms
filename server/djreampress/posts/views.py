from django.middleware.csrf import get_token
from django.urls import reverse
from djream.decorators import djream_view
from djream.response import DjreamCloseModalResponse, DjreamResponse

from .forms import PostForm
from .models import Post


@djream_view
def index(request):
    posts = Post.objects.all()

    return DjreamResponse(
        request,
        "PostIndex",
        {
            "posts": [
                {"title": post.title, "edit_url": reverse("posts_edit", args=[post.id])}
                for post in posts
            ]
        },
        title="Posts | Djreampress",
    )


@djream_view
def add(request):
    form = PostForm(request.POST or None)

    if form.is_valid():
        post = form.save()

        messages.success(
            request,
            f"Successfully added post '{post.title}'.",
        )

        return DjreamCloseModalResponse(request)

    return DjreamResponse(
        request,
        "PostForm",
        {
            "csrf_token": get_token(request),
            "action_url": reverse("posts_add"),
            "form": form,
        },
        supported_modes=["modal"],
        title="Add Post | Djreampress",
    )


@djream_view
def edit(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    form = PostForm()

    if form.is_valid():
        form.save()

    return DjreamResponse(
        request,
        "PostForm",
        {
            "form": form,
        },
    )


@djream_view
def delete(request, post_id):
    post = get_object_or_404(Post, id=post_id)

    return DjreamResponse(
        request,
        "CommonConfirmDelete",
        {},
    )
