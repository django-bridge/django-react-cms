from django import forms

from .models import Image


class ImageForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        if self.instance.pk:
            # Disallow editing the file after creation
            del self.fields["file"]

    class Meta:
        model = Image
        fields = ["title", "file"]
        widgets = {
            "title": forms.TextInput(),
        }
