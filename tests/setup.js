// Configuração global para testes
require('dotenv').config({ path: '.env.test' });

// Configurações do banco de dados para testes
process.env.DB_HOST = process.env.DB_HOST || 'localhost';
process.env.DB_USER = process.env.DB_USER || 'postgres';
process.env.DB_PASSWORD = process.env.DB_PASSWORD || 'postgres';
process.env.DB_DATABASE = process.env.DB_DATABASE || 'blog';
process.env.DB_PORT = process.env.DB_PORT || '5432';

// Silenciar logs durante os testes
if (process.env.NODE_ENV === 'test') {
  console.log = jest.fn();
  console.error = jest.fn();
  console.warn = jest.fn();
}

// Configurar timeout global para testes
jest.setTimeout(30000);
