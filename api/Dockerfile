FROM php:7.4-fpm-buster

RUN docker-php-ext-install bcmath pdo_mysql sockets

RUN apt-get update && apt-get install -y libpq-dev && docker-php-ext-install pdo pdo_pgsql
RUN apt-get install -y git zip unzip
RUN apt-get install -y iputils-ping

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

EXPOSE 9000
