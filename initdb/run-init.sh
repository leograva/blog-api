#!/bin/bash
set -e

# Executa o script de inicialização do banco
psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_DATABASE" -f /initdb/init.sql

echo "Script de inicialização executado com sucesso."
