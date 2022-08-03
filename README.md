# Запуск сервера Nest js в Docker контейнере

## 1. Создаем .env файл в корне проекта рядом с Dockerfile:

    - DB_TYPE = postgres
    - DB_HOST = postgres, эта же переменная будет и именем контейнера с базой данных
    - DB_PORT = 5432, стандартный порт postgres
    - DB_NAME = test_db, имя нашей базы данных
    - DB_USER = postgres, superuser базы данных
    - DB_PASSWORD = postgres, пароль от базы данных
    - JWT_EXPIRE = 30m, время жизни jwt-токена
    - JWT_SECRET = my-secret, секрет от jwt
    - APP_PORT = 8080, порт на котором сервер будет принимать запросы

### Можно ничего не менять вот готовые значения:

DB_TYPE = postgres
DB_HOST = postgres
DB_PORT = 5432
DB_NAME = test_db
DB_USER = postgres
DB_PASSWORD = postgres
JWT_EXPIRE = 30m
JWT_SECRET = my-secret
APP_PORT = 8080

## 2. Запускаем docker-compose up

## 3. Сервер работает! &#129346;

### Миграции лежат в src/db
