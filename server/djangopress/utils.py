from functools import update_wrapper


def decorate_urlpatterns(urlpatterns, decorator):
    """
    Decorate all the views in the passed urlpatterns list with the given decorator
    """
    for pattern in urlpatterns:
        if hasattr(pattern, "url_patterns"):
            # this is an included RegexURLResolver; recursively decorate the views
            # contained in it
            decorate_urlpatterns(pattern.url_patterns, decorator)

        if hasattr(pattern, "callback"):
            def new_callback(*args, **kwargs):
                decorated = decorator(pattern.callback)
                return decorated()(*args, **kwargs)
                
            pattern.callback = new_callback()

    return urlpatterns
