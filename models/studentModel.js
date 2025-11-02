// Importa o pool de conexões com o banco de dados a partir do arquivo de configuração.
const pool = require('../config/db');

/**
 * getAllStudents
 * Busca todos os estudantes cadastrados na tabela 'students' do banco de dados.
 * Retorna um array com todos os registros encontrados.
 */
const getAllStudents = async () => {
  try {
    console.log('MODEL: Executando query getAllStudents');
    const result = await pool.query('SELECT * FROM students ORDER BY created_at DESC');
    console.log('MODEL: Query getAllStudents executada com sucesso, encontrados:', result.rows.length, 'students');
    return result.rows;
  } catch (error) {
    console.error('MODEL: Erro em getAllStudents:', error);
    throw error;
  }
};

/**
 * getStudentById
 * Busca um estudante específico pelo seu id na tabela 'students'.
 * @param {number} id - O identificador único do post.
 * Retorna o objeto do post encontrado ou undefined se não existir.
 */
const getStudentById = async (id) => {
  try {
    console.log('MODEL: Executando query getStudentById para ID:', id);
    const result = await pool.query('SELECT * FROM students WHERE id = $1', [id]);
    console.log('MODEL: Query getStudentById executada, encontrado:', result.rows.length > 0 ? 'sim' : 'não');
    return result.rows[0];
  } catch (error) {
    console.error('MODEL: Erro em getStudentById:', error);
    throw error;
  }
};

/**
 * createStudent
 * Insere um novo estudante na tabela 'students' com nome e e-mail fornecidos.
 * @param {string} name - Nome do estudante.
 * @param {string} email - E-mail do estudante.
 * Retorna o objeto do estudante recém-criado.
 */
const createStudent = async (name, email) => {
  const result = await pool.query(
    'INSERT INTO students (name, email) VALUES ($1, $2) RETURNING *',
    [name, email]
  );
  return result.rows[0];
};

/**
 * updateStudent
 * Atualiza um estudante existente na tabela 'students' com novos valores de nome e e-mail.
 * @param {number} id - O identificador único do estudante a ser atualizado.
 * @param {string} name - Nome do estudante.
 * @param {string} email - Novo e-mail do estudante.
 * Retorna o objeto do estudante atualizado.
 */
const updateStudent = async (id, name, email) => {
  const result = await pool.query(
    'UPDATE students SET name = $1, email = $2 WHERE id = $3 RETURNING *',
    [name, email, id]
  );
  return result.rows[0];
};

/**
 * deleteStudent
 * Remove um estudante da tabela 'students' com base no id fornecido.
 * @param {number} id - O identificador único do estudante a ser removido.
 * Retorna o objeto do estudante removido.
 */
const deleteStudent = async (id) => {
  const result = await pool.query('DELETE FROM students WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

/**
 * searchStudents
 * Realiza uma busca por estudantes cujo nome ou e-mail contenham o termo informado (case-insensitive).
 * @param {string} query - Termo de busca.
 * Retorna um array com os estudantes encontrados.
 */
const searchStudents = async (query) => {
  const result = await pool.query(
    'SELECT * FROM students WHERE name ILIKE $1 OR email ILIKE $1',
    [`%${query}%`]
  );
  return result.rows;
};

/**
 * Exporta todas as funções do modelo de posts para serem utilizadas em outros módulos.
 */
module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  searchStudents
};
