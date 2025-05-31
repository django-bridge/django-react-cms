from django.shortcuts import redirect

from .models import Space


def default_space_redirect(request):
    space = Space.objects.filter(users=request.user).first()

    return redirect("home", space.slug)
