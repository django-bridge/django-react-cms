from django import forms

from .models import Image


class UploadForm(forms.ModelForm):

    class Meta:
        model = Image
        fields = ["title", "file"]
        widgets = {
            "title": forms.TextInput(),
        }


class EditForm(forms.ModelForm):

    class Meta:
        model = Image
        fields = ["title"]
        widgets = {
            "title": forms.TextInput(),
        }
