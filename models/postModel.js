// Importa o pool de conexões com o banco de dados a partir do arquivo de configuração.
const pool = require('../config/db');

/**
 * getAllPosts
 * Busca todos os posts cadastrados na tabela 'posts' do banco de dados.
 * Retorna um array com todos os registros encontrados.
 */
const getAllPosts = async () => {
  try {
    console.log('MODEL: Executando query getAllPosts');
    const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
    console.log('MODEL: Query getAllPosts executada com sucesso, encontrados:', result.rows.length, 'posts');
    return result.rows;
  } catch (error) {
    console.error('MODEL: Erro em getAllPosts:', error);
    throw error;
  }
};

/**
 * getPostById
 * Busca um post específico pelo seu id na tabela 'posts'.
 * @param {number} id - O identificador único do post.
 * Retorna o objeto do post encontrado ou undefined se não existir.
 */
const getPostById = async (id) => {
  try {
    console.log('MODEL: Executando query getPostById para ID:', id);
    const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
    console.log('MODEL: Query getPostById executada, encontrado:', result.rows.length > 0 ? 'sim' : 'não');
    return result.rows[0];
  } catch (error) {
    console.error('MODEL: Erro em getPostById:', error);
    throw error;
  }
};

/**
 * createPost
 * Insere um novo post na tabela 'posts' com título, conteúdo e autor fornecidos.
 * @param {string} title - Título do post.
 * @param {string} content - Conteúdo do post.
 * @param {string} author - Autor do post.
 * Retorna o objeto do post recém-criado.
 */
const createPost = async (title, content, author) => {
  const result = await pool.query(
    'INSERT INTO posts (title, content, author) VALUES ($1, $2, $3) RETURNING *',
    [title, content, author]
  );
  return result.rows[0];
};

/**
 * updatePost
 * Atualiza um post existente na tabela 'posts' com novos valores de título, conteúdo e autor.
 * @param {number} id - O identificador único do post a ser atualizado.
 * @param {string} title - Novo título do post.
 * @param {string} content - Novo conteúdo do post.
 * @param {string} author - Novo autor do post.
 * Retorna o objeto do post atualizado.
 */
const updatePost = async (id, title, content, author) => {
  const result = await pool.query(
    'UPDATE posts SET title = $1, content = $2, author = $3 WHERE id = $4 RETURNING *',
    [title, content, author, id]
  );
  return result.rows[0];
};

/**
 * deletePost
 * Remove um post da tabela 'posts' com base no id fornecido.
 * @param {number} id - O identificador único do post a ser removido.
 * Retorna o objeto do post removido.
 */
const deletePost = async (id) => {
  const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

/**
 * searchPosts
 * Realiza uma busca por posts cujo título ou conteúdo contenham o termo informado (case-insensitive).
 * @param {string} query - Termo de busca.
 * Retorna um array com os posts encontrados.
 */
const searchPosts = async (query) => {
  const result = await pool.query(
    'SELECT * FROM posts WHERE title ILIKE $1 OR content ILIKE $1',
    [`%${query}%`]
  );
  return result.rows;
};

/**
 * Exporta todas as funções do modelo de posts para serem utilizadas em outros módulos.
 */
module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  searchPosts
};
