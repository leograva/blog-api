// Importa o Pool do pacote 'pg' para gerenciar conexões com o PostgreSQL
const { Pool } = require('pg');

// Carrega variáveis de ambiente do arquivo .env
require('dotenv').config();

// Cria uma nova instância de Pool usando as configurações do .env
const pool = new Pool({
  user: process.env.DB_USER,       // Usuário do banco de dados
  host: process.env.DB_HOST,       // Host do banco de dados
  database: process.env.DB_DATABASE, // Nome do banco de dados
  password: process.env.DB_PASSWORD, // Senha do banco de dados
  port: process.env.DB_PORT,         // Porta do banco de dados
});

// Exporta o pool para ser utilizado em outros arquivos
module.exports = pool;