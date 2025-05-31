from django.urls import reverse


def urls(request):
    space = getattr(request, "space", None)

    if space:
        return {
            "posts_index": reverse("posts_index"),
            "files_index": reverse("files_index", args=[space.slug]),
        }

    else:
        return {
            "posts_index": reverse("posts_index"),
        }
