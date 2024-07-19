# Django/React CMS Demo

This repository contains a clone of Wordpress built with Django and React using [Django Render](https://django-render.org) to integrate them.

All of this application is backed by Django views which provide the data and perform operations.
The frontend is rendered entirely with React using components from MUI.

[See the demo live here](https://demo.django-render.org)

## Running it

To get a sense of what Django Render is like to develop with, give it a try in one of the following ways.
I'd recommend editing [one of the frontend views](https://github.com/kaedroho/djangopress/blob/main/client/src/views/Home/HomeView.tsx) and see it instantly re-render with your changes!
Or, if you're more of a backend dev, have a look at the [backend views](https://github.com/kaedroho/djangopress/blob/main/server/djangopress/posts/views.py) that supply the data for the frontend views to render.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/kaedroho/djangopress)

### With Docker compose

The easiest way to get this up and running is to use `docker compose`, a subcommand of Docker. Make sure you have Docker installed then run:

```
make setup
make superuser
make start
```

Then Djangopress should be running on [localhost:8000](http://localhost:8000)

### Without Docker compose

It's possible to run this without docker compose as well, you will need to have Python 11 and Node JS installed locally.

First open two terminals.

In the first terminal, run the following to install and start the Vite server, which builds and serves the built JavaScript code containing the frontend:

```
cd client
npm install
npm run dev
```

This should start a server at [localhost:5173](http://localhost:5173), there shouldn't be anything here, this will be used by the Django server to fetch freshly built JavaScript.

In the second terminal, run the following to install Django, create the database, create a user, then start the Django devserver:

```
cd server
poetry install
poetry run python manage.py migrate
poetry run python manage.py createsuperuser
poetry run python manage.py runserver
```

Then Djangopress should be running on [localhost:8000](http://localhost:8000)
