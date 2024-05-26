from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from . import views
from .media import views as media_views
from .posts import views as posts_views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", views.home, name="home"),
    # Posts
    path("posts/", posts_views.index, name="posts_index"),
    path("posts/add/", posts_views.add, name="posts_add"),
    path("posts/<int:post_id>/edit/", posts_views.edit, name="posts_edit"),
    path("posts/<int:post_id>/delete/", posts_views.delete, name="posts_delete"),
    # Media
    path("media/", media_views.index, name="media_index"),
    path("media/add-image/", media_views.add_image, name="media_add_image"),
    path("media/<int:mediaasset_id>/edit/", media_views.edit, name="media_edit"),
    path("media/<int:mediaasset_id>/delete/", media_views.delete, name="media_delete"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
