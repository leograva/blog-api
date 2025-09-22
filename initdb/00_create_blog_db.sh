#!/bin/bash
set -e

echo "🔧 Verificando se o banco '${DB_DATABASE}' existe..."

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
DO \$\$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_database WHERE datname = '${DB_DATABASE}'
   ) THEN
      RAISE NOTICE 'Criando banco ${DB_DATABASE}...';
      CREATE DATABASE ${DB_DATABASE};
   ELSE
      RAISE NOTICE 'Banco ${DB_DATABASE} já existe.';
   END IF;
END
\$\$;
EOSQL
