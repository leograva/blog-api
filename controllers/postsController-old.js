// Importa o modelo de postagens
const postModel = require('../models/postModel');
const { AppError, asyncHandler } = require('../middleware/errorHandler');

// Controlador para listar todas as postagens
exports.getPosts = asyncHandler(async (req, res) => {
  console.log('Iniciando busca de posts...');
  
  // Busca todas as postagens no banco de dados
  const posts = await postModel.getAllPosts();
  
  console.log('Posts encontrados:', posts.length);
  
  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: {
      posts
    }
  });
});

// Controlador para buscar uma postagem pelo ID
exports.getPostById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  // Validação do ID
  if (!id || isNaN(id)) {
    throw new AppError('ID inválido. Deve ser um número', 400);
  }
  
  console.log('Buscando post com ID:', id);
  
  // Busca a postagem pelo ID
  const post = await postModel.getPostById(id);
  
  if (!post) {
    throw new AppError('Post não encontrado', 404, { postId: id });
  }
  
  res.status(200).json({
    status: 'success',
    data: {
      post
    }
  });
});

// Controlador para criar uma nova postagem
exports.createPost = asyncHandler(async (req, res) => {
  const { title, content, author } = req.body;
  
  // Validação de campos obrigatórios
  const missingFields = [];
  if (!title) missingFields.push('title');
  if (!content) missingFields.push('content');
  if (!author) missingFields.push('author');
  
  if (missingFields.length > 0) {
    throw new AppError(
      'Campos obrigatórios não informados',
      400,
      { missingFields }
    );
  }
  
  // Validações adicionais
  if (title.length < 3) {
    throw new AppError('Título deve ter pelo menos 3 caracteres', 400);
  }
  
  if (content.length < 10) {
    throw new AppError('Conteúdo deve ter pelo menos 10 caracteres', 400);
  }
  
  console.log('Criando novo post:', { title, author });
  
  // Cria a nova postagem
  const newPost = await postModel.createPost(title, content, author);
  
  res.status(201).json({
    status: 'success',
    message: 'Post criado com sucesso',
    data: {
      post: newPost
    }
  });
});

// Controlador para atualizar uma postagem existente
exports.updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;
  
  // Validação do ID
  if (!id || isNaN(id)) {
    throw new AppError('ID inválido. Deve ser um número', 400);
  }
  
  // Validação de campos obrigatórios
  const missingFields = [];
  if (!title) missingFields.push('title');
  if (!content) missingFields.push('content');
  if (!author) missingFields.push('author');
  
  if (missingFields.length > 0) {
    throw new AppError(
      'Campos obrigatórios não informados',
      400,
      { missingFields }
    );
  }
  
  console.log('Atualizando post ID:', id);
  
  // Atualiza a postagem
  const updatedPost = await postModel.updatePost(id, title, content, author);
  
  if (!updatedPost) {
    throw new AppError('Post não encontrado', 404, { postId: id });
  }
  
  res.status(200).json({
    status: 'success',
    message: 'Post atualizado com sucesso',
    data: {
      post: updatedPost
    }
  });
});

// Controlador para deletar uma postagem
exports.deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  // Validação do ID
  if (!id || isNaN(id)) {
    throw new AppError('ID inválido. Deve ser um número', 400);
  }
  
  console.log('Deletando post ID:', id);
  
  // Deleta a postagem
  const deletedPost = await postModel.deletePost(id);
  
  if (!deletedPost) {
    throw new AppError('Post não encontrado', 404, { postId: id });
  }
  
  res.status(200).json({
    status: 'success',
    message: 'Post deletado com sucesso',
    data: {
      deletedPost: deletedPost
    }
  });
});

// Controlador para buscar postagens por termo de pesquisa
exports.searchPosts = asyncHandler(async (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    throw new AppError('Parâmetro "q" é obrigatório para busca', 400);
  }
  
  if (q.length < 2) {
    throw new AppError('Termo de busca deve ter pelo menos 2 caracteres', 400);
  }
  
  console.log('Buscando posts com termo:', q);
  
  // Busca postagens que correspondam ao termo
  const posts = await postModel.searchPosts(q);
  
  res.status(200).json({
    status: 'success',
    results: posts.length,
    searchTerm: q,
    data: {
      posts
    }
  });
});
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