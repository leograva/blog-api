-- Cria o banco de dados 'blog' se ele não existir
DO
$$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'blog') THEN
    PERFORM dblink_exec('dbname=' || current_database(), 'CREATE DATABASE blog');
  END IF;
END
$$;

-- Conecta à database 'blog'
\c blog

-- Cria a tabela 'posts' se ela não existir
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,                
  title VARCHAR(255) NOT NULL,          
  content TEXT NOT NULL,                
  author VARCHAR(255) NOT NULL,         
  created_at TIMESTAMP DEFAULT NOW()    
);