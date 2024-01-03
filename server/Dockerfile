FROM node:18.17.1-bullseye-slim as client

# Install client dependencies
COPY client/package.json client/package-lock.json /client/
RUN cd /client && npm install

# Copy the source code of the client into the container.
COPY client /client

# Build the client
RUN cd /client && npm run build

FROM python:3.11.5-slim-bullseye AS base

RUN apt update -y \
    && apt install -y --no-install-recommends \
    # Required to build psycopg2
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

ENV VIRTUAL_ENV=/venv
ENV PATH=$VIRTUAL_ENV/bin:$PATH \
    PYTHONPATH=/app \
    PYTHONUNBUFFERED=1 \
    DJANGO_SETTINGS_MODULE=djreamdemo.settings \
    PORT=8000

# Add user that will be used in the container
RUN useradd djreamdemo --create-home && mkdir /app $VIRTUAL_ENV && chown -R djreamdemo /app $VIRTUAL_ENV

# Install poetry
RUN pip install poetry==1.5.1

# Use user "djreamdemo" to run the build commands below and the server itself.
USER djreamdemo

# Use /app folder as a directory where the source code is stored.
WORKDIR /app

# Set up virtual environment
RUN python -m venv $VIRTUAL_ENV

# Install Python dependencies
COPY --chown=djreamdemo server/pyproject.toml server/poetry.lock ./
RUN poetry install --no-root --only main

# Copy the source code of the project into the container.
COPY --chown=djreamdemo server .

# Run poetry install again to install our project
RUN poetry install --only main

FROM base as prod

# Copy the client bundle from the client target
COPY --chown=djreamdemo --from=client /client/dist /client

# Collect static files
ENV DJREAM_VITE_BUNDLE_DIR=/client
RUN python manage.py collectstatic --noinput --clear

CMD django-admin migrate && gunicorn -w 4 --threads 2 djreamdemo.wsgi:application

FROM base AS dev

# Install dev dependencies
RUN poetry install
