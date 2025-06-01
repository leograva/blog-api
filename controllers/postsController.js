const postModel = require('../models/postModel');

exports.getPosts = async (req, res) => {
  try {
    const posts = await postModel.getAllPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar postagens' });
  }
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postModel.getPostById(id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: 'Postagem não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter postagem' });
  }
};

exports.createPost = async (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content || !author) {
    return res.status(400).json({ error: 'Campos obrigatórios: title, content, author' });
  }
  try {
    const newPost = await postModel.createPost(title, content, author);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar postagem' });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;
  if (!title || !content || !author) {
    return res.status(400).json({ error: 'Campos obrigatórios: title, content, author' });
  }
  try {
    const updatedPost = await postModel.updatePost(id, title, content, author);
    if (updatedPost) {
      res.json(updatedPost);
    } else {
      res.status(404).json({ error: 'Postagem não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar postagem' });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await postModel.deletePost(id);
    if (deletedPost) {
      res.json({ message: 'Postagem deletada com sucesso' });
    } else {
      res.status(404).json({ error: 'Postagem não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar postagem' });
  }
};

exports.searchPosts = async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'Parâmetro "q" é obrigatório para busca' });
  }
  try {
    const posts = await postModel.searchPosts(q);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar postagens' });
  }
};