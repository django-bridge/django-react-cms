FROM node:18.18.2-bullseye-slim as dev

ARG UID=1000
RUN userdel node && useradd djangopress --uid ${UID} -l --create-home && mkdir /client && chown djangopress /client

WORKDIR /client
USER djangopress
