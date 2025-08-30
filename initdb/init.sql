-- Cria a tabela 'posts' se ela não existir
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,                
  title VARCHAR(255) NOT NULL,          
  content TEXT NOT NULL,                
  author VARCHAR(255) NOT NULL,         
  created_at TIMESTAMP DEFAULT NOW()    
);