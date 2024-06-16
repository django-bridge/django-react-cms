from django.urls import reverse


def urls(request):
    return {
        "posts_index": reverse("posts_index"),
        "media_index": reverse("media_index"),
    }
