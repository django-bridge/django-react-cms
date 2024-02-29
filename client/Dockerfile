FROM node:18.18.2-bullseye-slim as dev

ARG UID=1000
RUN userdel node && useradd mezepress --uid ${UID} -l --create-home && mkdir /client && chown mezepress /client

WORKDIR /client
USER mezepress
