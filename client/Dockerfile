FROM node:18.18.2-bullseye-slim as dev

ARG UID=1000
RUN userdel node && useradd djreamdemo --uid ${UID} -l --create-home && mkdir /app && chown djreamdemo /app

WORKDIR /app
USER djreamdemo
