from django import forms

from .models import Page
from ..widgets import BlockNoteEditor


class PageForm(forms.ModelForm):
    title = forms.CharField(widget=forms.TextInput(attrs={"variant": "large"}))
    content = forms.CharField(widget=BlockNoteEditor(), initial='[{"type": "paragraph", "content": ""}]')

    class Meta:
        model = Page
        fields = ["title", "content"]
