// Importa o modelo de postagens
const postModel = require('../models/postModel');

// Controlador para listar todas as postagens
exports.getPosts = async (req, res) => {
  try {
    // Busca todas as postagens no banco de dados
    const posts = await postModel.getAllPosts();
    res.json(posts); // Retorna as postagens em formato JSON
  } catch (err) {
    // Em caso de erro, retorna status 500 e mensagem de erro
    res.status(500).json({ error: `Erro ao listar postagens ${err.message}` });
  }
};

// Controlador para buscar uma postagem pelo ID
exports.getPostById = async (req, res) => {
  const { id } = req.params; // Obtém o ID dos parâmetros da requisição
  try {
    // Busca a postagem pelo ID
    const post = await postModel.getPostById(id);
    if (post) {
      res.json(post); // Se encontrada, retorna a postagem
    } else {
      // Se não encontrada, retorna status 404
      res.status(404).json({ error: 'Postagem não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter postagem' });
  }
};

// Controlador para criar uma nova postagem
exports.createPost = async (req, res) => {
  const { title, content, author } = req.body; // Obtém dados do corpo da requisição
  // Valida se todos os campos obrigatórios foram enviados
  if (!title || !content || !author) {
    return res.status(400).json({ error: 'Campos obrigatórios: title, content, author' });
  }
  try {
    // Cria a nova postagem
    const newPost = await postModel.createPost(title, content, author);
    res.status(201).json(newPost); // Retorna a postagem criada com status 201
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar postagem' });
  }
};

// Controlador para atualizar uma postagem existente
exports.updatePost = async (req, res) => {
  const { id } = req.params; // Obtém o ID dos parâmetros
  const { title, content, author } = req.body; // Dados do corpo da requisição
  // Valida campos obrigatórios
  if (!title || !content || !author) {
    return res.status(400).json({ error: 'Campos obrigatórios: title, content, author' });
  }
  try {
    // Atualiza a postagem
    const updatedPost = await postModel.updatePost(id, title, content, author);
    if (updatedPost) {
      res.json(updatedPost); // Retorna a postagem atualizada
    } else {
      res.status(404).json({ error: 'Postagem não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar postagem' });
  }
};

// Controlador para deletar uma postagem
exports.deletePost = async (req, res) => {
  const { id } = req.params; // Obtém o ID dos parâmetros
  try {
    // Deleta a postagem
    const deletedPost = await postModel.deletePost(id);
    if (deletedPost) {
      res.json({ message: 'Postagem deletada com sucesso' }); // Mensagem de sucesso
    } else {
      res.status(404).json({ error: 'Postagem não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar postagem' });
  }
};

// Controlador para buscar postagens por termo de pesquisa
exports.searchPosts = async (req, res) => {
  const { q } = req.query; // Obtém o termo de busca dos parâmetros de query
  if (!q) {
    return res.status(400).json({ error: 'Parâmetro "q" é obrigatório para busca' });
  }
  try {
    // Busca postagens que correspondam ao termo
    const posts = await postModel.searchPosts(q);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar postagens' });
  }
};