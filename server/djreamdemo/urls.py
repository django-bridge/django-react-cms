from django.contrib import admin
from django.urls import path

from . import views
from .posts import views as posts_views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", views.home, name="home"),
    path("posts/", posts_views.index, name="posts_index"),
    path("posts/add/", posts_views.add, name="posts_add"),
    path("posts/<int:post_id>/edit/", posts_views.edit, name="posts_edit"),
]
