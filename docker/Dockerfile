FROM nginx:alpine

LABEL maintainer="Jeremy Collins <jdodsoncollins@gmail.com>"

RUN rm -rf /etc/nginx/conf.d

COPY ./nginx/conf.d /etc/nginx/conf.d

ADD app.tgz /app

EXPOSE 80
