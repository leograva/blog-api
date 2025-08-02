const pool = require('../../config/db');

/**
 * Limpa todas as tabelas do banco de dados de teste
 */
const clearDatabase = async () => {
  try {
    await pool.query('DELETE FROM posts');
    // Reset do sequence para ID começar do 1
    await pool.query('ALTER SEQUENCE posts_id_seq RESTART WITH 1');
  } catch (error) {
    console.error('Erro ao limpar banco de dados:', error);
    throw error;
  }
};

/**
 * Insere dados de teste no banco
 */
const seedDatabase = async () => {
  const testPosts = [
    {
      title: 'Post de Teste 1',
      content: 'Conteúdo do primeiro post de teste para validação dos endpoints',
      author: 'Autor Teste'
    },
    {
      title: 'Post de Teste 2', 
      content: 'Segundo post de teste com conteúdo diferente para busca',
      author: 'Outro Autor'
    },
    {
      title: 'Artigo sobre JavaScript',
      content: 'Este é um artigo completo sobre JavaScript e suas funcionalidades',
      author: 'Dev Expert'
    }
  ];

  for (const post of testPosts) {
    await pool.query(
      'INSERT INTO posts (title, content, author) VALUES ($1, $2, $3)',
      [post.title, post.content, post.author]
    );
  }
};

/**
 * Fecha conexão com banco de dados
 */
const closeDatabase = async () => {
  await pool.end();
};

/**
 * Verifica se uma tabela existe
 */
const tableExists = async (tableName) => {
  try {
    const result = await pool.query(
      "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = $1)",
      [tableName]
    );
    return result.rows[0].exists;
  } catch (error) {
    return false;
  }
};

/**
 * Cria um post de teste
 */
const createTestPost = async (overrides = {}) => {
  const defaultPost = {
    title: 'Post de Teste',
    content: 'Conteúdo de teste para validação',
    author: 'Autor de Teste'
  };
  
  const post = { ...defaultPost, ...overrides };
  
  const result = await pool.query(
    'INSERT INTO posts (title, content, author) VALUES ($1, $2, $3) RETURNING *',
    [post.title, post.content, post.author]
  );
  
  return result.rows[0];
};

module.exports = {
  clearDatabase,
  seedDatabase,
  closeDatabase,
  tableExists,
  createTestPost
};
