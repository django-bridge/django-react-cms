from django import forms

from .models import Page
from ..widgets import BlockNoteEditor


class PageForm(forms.ModelForm):
    class Meta:
        model = Page
        fields = ["name", "content"]
        labels = {"name": "Title"}
        widgets = {
            "name": forms.TextInput(attrs={"variant": "large"}),
            "content": BlockNoteEditor(),
        }
