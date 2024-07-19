import string

from django.contrib import messages
from django.contrib.auth import login
from django.contrib.auth.views import LoginView as BaseLoginView
from django.shortcuts import redirect
from django.urls import reverse
from django.utils.crypto import get_random_string
from django.views.decorators.http import require_POST
from django_bridge.views import DjangoBridgeView

from .models import User


class LoginView(DjangoBridgeView, BaseLoginView):
    title = "Sign in to Djangopress"
    view_name = "Login"

    def form_valid(self, form):
        # Add a success message to the next page.
        messages.success(
            self.request,
            "Successfully logged in as {}".format(form.get_user()),
        )

        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        return {
            "form": context["form"],
            "actionUrl": reverse("login"),
            "tempActionUrl": reverse("login_temporary"),
        }


@require_POST
def login_temporary(request):
    user = User.objects.create(
        username="temp-" + get_random_string(10, allowed_chars=string.ascii_lowercase),
        is_temporary=True,
    )

    login(request, user)

    return redirect("home")
