FROM node:18.18.2-bullseye-slim as dev

ARG UID=1000
RUN userdel node && useradd djreampress --uid ${UID} -l --create-home && mkdir /app && chown djreampress /app

WORKDIR /app
USER djreampress
