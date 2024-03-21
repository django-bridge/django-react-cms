from djangorender.decorators import djangorender_view
from djangorender.response import MezeResponse


@djangorender_view
def home(request):
    return MezeResponse(request, "Home", {})
