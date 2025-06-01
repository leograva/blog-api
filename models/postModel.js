const pool = require('../config/db');

const getAllPosts = async () => {
  const result = await pool.query('SELECT * FROM posts');
  return result.rows;
};

const getPostById = async (id) => {
  const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
  return result.rows[0];
};

const createPost = async (title, content, author) => {
  const result = await pool.query(
    'INSERT INTO posts (title, content, author) VALUES ($1, $2, $3) RETURNING *',
    [title, content, author]
  );
  return result.rows[0];
};

const updatePost = async (id, title, content, author) => {
  const result = await pool.query(
    'UPDATE posts SET title = $1, content = $2, author = $3 WHERE id = $4 RETURNING *',
    [title, content, author, id]
  );
  return result.rows[0];
};

const deletePost = async (id) => {
  const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

const searchPosts = async (query) => {
  const result = await pool.query(
    'SELECT * FROM posts WHERE title ILIKE $1 OR content ILIKE $1',
    [`%${query}%`]
  );
  return result.rows;
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  searchPosts,
};