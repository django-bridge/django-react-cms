from django import forms
from django.conf import settings
from django.forms.models import ModelChoiceIteratorValue
from django.template.defaultfilters import filesizeformat
from django_render.adapters import Adapter, register
from telepath import ValueNode


class TextInputAdapter(Adapter):
    js_constructor = "forms.TextInput"

    def js_args(self, widget):
        return [
            "text",
            widget.attrs.get("class", ""),
        ]


register(TextInputAdapter(), forms.TextInput)


class PasswordInputAdapter(Adapter):
    js_constructor = "forms.TextInput"

    def js_args(self, widget):
        return [
            "password",
            widget.attrs.get("class", ""),
        ]


register(PasswordInputAdapter(), forms.PasswordInput)


class FileInputAdapter(Adapter):
    js_constructor = "forms.FileInput"

    def js_args(self, widget):
        return [
            widget.attrs.get("class", ""),
            widget.attrs.get("accept", ""),
            filesizeformat(settings.MAX_UPLOAD_SIZE),
        ]


register(FileInputAdapter(), forms.FileInput)


class SelectAdapter(Adapter):
    js_constructor = "forms.Select"

    def js_args(self, widget):
        return [
            widget.options("__NAME__", ""),
            widget.attrs.get("class", ""),
        ]


register(SelectAdapter(), forms.Select)
