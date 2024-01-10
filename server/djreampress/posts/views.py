from djream.decorators import djream_view
from djream.response import DjreamResponse

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
