#!/bin/sh
set -e

echo "Aguardando o banco de dados ficar disponível..."
until nc -z database 5432; do
  sleep 1
done

echo "Aplicando as migrations..."
npx prisma migrate deploy

echo "Iniciando a aplicação..."
exec node dist/main.js
