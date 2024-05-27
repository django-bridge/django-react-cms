from django import forms

from .models import Post
from ..widgets import BlockNoteEditor


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ["title", "content"]
        widgets = {
            "title": forms.TextInput(),
            "content": BlockNoteEditor(),
        }
