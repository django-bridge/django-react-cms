from django.contrib import admin
from django.contrib.auth.decorators import login_required
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from . import views
from .auth import views as auth_views
from .media import views as media_views
from .posts import views as posts_views
from .utils import decorate_urlpatterns

# Put any URLs that require authentication in this list.
urlpatterns_auth = [
    path("admin/", admin.site.urls),
    path("", views.home, name="home"),
    # Posts
    path("posts/", posts_views.index, name="posts_index"),
    path("posts/add/", posts_views.add, name="posts_add"),
    path("posts/<int:post_id>/edit/", posts_views.edit, name="posts_edit"),
    path("posts/<int:post_id>/delete/", posts_views.delete, name="posts_delete"),
    # Media
    path("media/", media_views.index, name="media_index"),
    path("media/upload/", media_views.upload, name="media_upload"),
    path("media/<int:mediaasset_id>/edit/", media_views.edit, name="media_edit"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Put any URLs that do not require authentication in this list.
urlpatterns_noauth = [
    path("login/", auth_views.LoginView.as_view(), name="login"),
    path("media/<int:mediaasset_id>/delete/", media_views.delete, name="media_delete"),
]

if settings.DEMO_MODE:
    urlpatterns_noauth += [
        path("login-temporary/", auth_views.login_temporary, name="login_temporary"),
    ]

urlpatterns = urlpatterns_noauth + decorate_urlpatterns(
    urlpatterns_auth, login_required
)
