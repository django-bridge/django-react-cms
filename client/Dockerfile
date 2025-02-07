FROM node:22.13.1-bookworm-slim AS dev

ARG UID=1000
RUN userdel node && useradd djangopress --uid ${UID} -l --create-home && mkdir /client && chown djangopress /client

WORKDIR /client
USER djangopress
