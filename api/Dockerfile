FROM php:8.0.3-fpm-buster

WORKDIR /var/www

RUN docker-php-ext-install bcmath pdo_mysql

RUN apt-get update && apt-get install -y libpq-dev && docker-php-ext-install pdo pdo_pgsql
RUN apt-get install -y git zip unzip
RUN apt-get install -y iputils-ping

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

EXPOSE 9000
