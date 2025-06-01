-- Cria a tabela 'posts' se ela não existir
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,                -- Identificador único para cada post
  title VARCHAR(255) NOT NULL,          -- Título do post (obrigatório)
  content TEXT NOT NULL,                -- Conteúdo do post (obrigatório)
  author VARCHAR(255) NOT NULL,         -- Autor do post (obrigatório)
  created_at TIMESTAMP DEFAULT NOW()    -- Data e hora de criação do post (valor padrão: agora)
);