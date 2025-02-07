FROM node:22.13.1-bookworm-slim AS client

# Install client dependencies
COPY client/package.json client/package-lock.json /client/
RUN cd /client && npm install

# Copy the source code of the client into the container.
COPY client /client

# Build the client
RUN cd /client && npm run build

FROM python:3.13.1-slim-bookworm AS base

RUN apt update -y \
    && apt install -y --no-install-recommends \
    # Required to build psycopg2
    build-essential \
    libpq-dev \
    # Required for django-admin dbshell
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

ENV VIRTUAL_ENV=/venv
ENV PATH=$VIRTUAL_ENV/bin:$PATH \
    PYTHONPATH=/server \
    PYTHONUNBUFFERED=1 \
    DJANGO_SETTINGS_MODULE=djangopress.settings \
    BASE_URL=http://localhost:8000 \
    PORT=8000

# Add user that will be used in the container
ARG UID=1000
RUN useradd djangopress --uid ${UID} --create-home && mkdir /server $VIRTUAL_ENV && chown -R djangopress /server $VIRTUAL_ENV

# Install poetry
RUN pip install poetry==1.5.1

# Use user "djangopress" to run the build commands below and the server itself.
USER djangopress

# Use /server folder as a directory where the source code is stored.
WORKDIR /server

# Set up virtual environment
RUN python -m venv $VIRTUAL_ENV

# Install Python dependencies
COPY --chown=djangopress server/pyproject.toml server/poetry.lock ./
RUN poetry install --no-root --only main

# Copy the source code of the project into the container.
COPY --chown=djangopress server .

# Run poetry install again to install our project
RUN poetry install --only main

FROM base AS prod

# Copy the client bundle from the client target
COPY --chown=djangopress --from=client /client/dist /client

# Collect static files
ENV VITE_BUNDLE_DIR=/client
RUN DJANGO_SECRET_KEY=secret python manage.py collectstatic --noinput --clear

CMD django-admin migrate && gunicorn -w 4 --threads 2 djangopress.wsgi:application

FROM base AS dev

# Install dev dependencies
RUN poetry install
