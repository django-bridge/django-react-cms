from django.contrib import admin
from django.contrib.auth.decorators import login_required
from django.urls import include, path
from django.conf.urls.static import static
from django.conf import settings

from . import views
from .auth import views as auth_views
from .files import views as files_views
from .pages import views as pages_views
from .utils import decorate_urlpatterns
from .spaces.decorators import space_from_url
from .spaces import views as spaces_views

# Put any space-specific URLs here
urlpatterns_space = [
    path("", views.home, name="home"),
    # Pages
    path("pages/", pages_views.index, name="pages_index"),
    path("pages/add/", pages_views.add, name="pages_add"),
    path("pages/<uuid:page_id>/edit/", pages_views.edit, name="pages_edit"),
    path("pages/<uuid:page_id>/delete/", pages_views.delete, name="pages_delete"),
    # Files
    path("files/", files_views.index, name="files_index"),
    path("files/upload/", files_views.upload, name="files_upload"),
    path("files/<uuid:file_id>/edit/", files_views.edit, name="files_edit"),
    path("files/<uuid:file_id>/delete/", files_views.delete, name="files_delete"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


# Put any URLs that require authentication in this list.
urlpatterns_auth = [
    path("admin/", admin.site.urls),
    path("", spaces_views.default_space_redirect),
    # Spaces
    path(
        "<str:space_slug>/",
        include(decorate_urlpatterns(urlpatterns_space, space_from_url)),
    ),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Put any URLs that do not require authentication in this list.
urlpatterns_noauth = [
    path("login/", auth_views.LoginView.as_view(), name="login"),
]

if settings.DEMO_MODE:
    urlpatterns_noauth += [
        path("login-temporary/", auth_views.login_temporary, name="login_temporary"),
    ]

urlpatterns = urlpatterns_noauth + decorate_urlpatterns(
    urlpatterns_auth, login_required
)
