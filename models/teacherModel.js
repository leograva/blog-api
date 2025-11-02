// Importa o pool de conexões com o banco de dados a partir do arquivo de configuração.
const pool = require('../config/db');

/**
 * getAllTeachers
 * Busca todos os Professores cadastrados na tabela 'teachers' do banco de dados.
 * Retorna um array com todos os registros encontrados.
 */
const getAllTeachers = async () => {
  try {
    console.log('MODEL: Executando query getAllTeachers');
    const result = await pool.query('SELECT * FROM teachers ORDER BY created_at DESC');
    console.log('MODEL: Query getAllTeachers executada com sucesso, encontrados:', result.rows.length, 'teachers');
    return result.rows;
  } catch (error) {
    console.error('MODEL: Erro em getAllTeachers:', error);
    throw error;
  }
};

/**
 * getTeacherById
 * Busca um professor específico pelo seu id na tabela 'teachers'.
 * @param {number} id - O identificador único do professor.
 * Retorna o objeto do professor encontrado ou undefined se não existir.
 */
const getTeacherById = async (id) => {
  try {
    console.log('MODEL: Executando query getTeacherById para ID:', id);
    const result = await pool.query('SELECT * FROM teachers WHERE id = $1', [id]);
    console.log('MODEL: Query getTeacherById executada, encontrado:', result.rows.length > 0 ? 'sim' : 'não');
    return result.rows[0];
  } catch (error) {
    console.error('MODEL: Erro em getTeacherById:', error);
    throw error;
  }
};

/**
 * createTeacher
 * Insere um novo professor na tabela 'teachers' com nome e e-mail.
 * @param {string} name - Nome do professor.
 * @param {string} email - E-mail do professor
 * Retorna o objeto do professor recém-criado.
 */
const createTeacher = async (name, email) => {
  const result = await pool.query(
    'INSERT INTO teachers (name, email) VALUES ($1, $2) RETURNING *',
    [name, email]
  );
  return result.rows[0];
};

/**
 * updateTeacher
 * Atualiza um professor existente na tabela 'teachers' com novos valores de nome e e-mail.
 * @param {number} id - O identificador único do professor a ser atualizado.
 * @param {string} name - Nome do professor.
 * @param {string} email - E-mail do professor
 * Retorna o objeto do professor atualizado.
 */
const updateTeacher = async (id, name, email) => {
  const result = await pool.query(
    'UPDATE teachers SET name = $1, email = $2 WHERE id = $3 RETURNING *',
    [name, email, id]
  );
  return result.rows[0];
};

/**
 * deleteTeacher
 * Remove um professor da tabela 'teachers' com base no id fornecido.
 * @param {number} id - O identificador único do post a ser removido.
 * Retorna o objeto do post removido.
 */
const deleteTeacher = async (id) => {
  const result = await pool.query('DELETE FROM teachers WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

/**
 * searchTeachers
 * Realiza uma busca por professores cujo nome ou e-mail contenham o termo informado (case-insensitive).
 * @param {string} query - Termo de busca.
 * Retorna um array com os professores encontrados.
 */
const searchTeachers = async (query) => {
  const result = await pool.query(
    'SELECT * FROM teachers WHERE name ILIKE $1 OR email ILIKE $1',
    [`%${query}%`]
  );  
  return result.rows;
};

/**
 * Exporta todas as funções do modelo de teachers para serem utilizadas em outros módulos.
 */
module.exports = {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  searchTeachers
};
