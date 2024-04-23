from django_render.decorators import djangorender_view
from django_render.response import Response


@djangorender_view
def home(request):
    return Response(request, "Home", {})
