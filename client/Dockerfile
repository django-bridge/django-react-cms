FROM node:18.18.2-bullseye-slim as dev

RUN userdel node && useradd djreamdemo -l --create-home && mkdir /app && chown djreamdemo /app

WORKDIR /app
USER djreamdemo
