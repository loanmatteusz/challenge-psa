#!/bin/sh
set -e

DB_HOST=$(echo "$DATABASE_URL" | sed -E 's|.*@([^:/]+).*|\1|')
DB_PORT=$(echo "$DATABASE_URL" | sed -E 's|.*:([0-9]+)/.*|\1|')

echo "Esperando o banco em $DB_HOST:$DB_PORT..."

until nc -z "$DB_HOST" "$DB_PORT"; do
  sleep 1
done

echo "Aplicando as migrations..."
npx prisma migrate deploy

echo "Iniciando a aplicação..."
exec node dist/main.js
