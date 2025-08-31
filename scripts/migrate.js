const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'blog',
});

const createPostsTable = `
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR(255), -- Adiciona a coluna author
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const addAuthorColumn = `
ALTER TABLE posts ADD COLUMN IF NOT EXISTS author VARCHAR(255);
`;

async function migrate() {
  try {
    await client.connect();
    await client.query(createPostsTable);
    await client.query(addAuthorColumn); // Garante que a coluna exista
    console.log('Migration ran successfully!');
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

migrate();