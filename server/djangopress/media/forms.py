from django import forms

from .models import Image


class UploadForm(forms.ModelForm):

    class Meta:
        model = Image
        fields = ["title", "file", "status"]
        widgets = {
            "title": forms.TextInput(),
        }


class EditForm(forms.ModelForm):

    class Meta:
        model = Image
        fields = ["title", "status"]
        widgets = {
            "title": forms.TextInput(),
        }
