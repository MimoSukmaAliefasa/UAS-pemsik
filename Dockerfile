# Gunakan image PHP dengan Apache
FROM php:8.2-apache

# Atur direktori kerja di dalam container
WORKDIR /var/www/html

# Update package list dan install ekstensi yang dibutuhkan
RUN apt-get update && \
    apt-get install -y libpng-dev && \
    docker-php-ext-install pdo pdo_mysql gd && \
    docker-php-ext-install mysqli && docker-php-ext-enable mysqli

# Install dan aktifkan ekstensi Redis
RUN pecl install redis && docker-php-ext-enable redis

# Buka port 80
EXPOSE 80

# Jalankan Apache saat container dimulai
CMD ["apache2-foreground"]
