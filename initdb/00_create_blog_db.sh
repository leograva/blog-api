#!/bin/bash
set -e

if [ -z "$DB_DATABASE" ]; then
  echo "❌ ERRO: A variável DB_DATABASE não está definida"
  exit 1
fi

echo "🔧 Verificando se o banco '${DB_DATABASE}' existe..."

DB_EXISTS=$(psql -U "$POSTGRES_USER" -tAc "SELECT 1 FROM pg_database WHERE datname = '${DB_DATABASE}'")

if [ "$DB_EXISTS" != "1" ]; then
  echo "📦 Banco '${DB_DATABASE}' não existe. Criando..."
  createdb -U "$POSTGRES_USER" "$DB_DATABASE"
else
  echo "✅ Banco '${DB_DATABASE}' já existe. Nenhuma ação necessária."
fi
