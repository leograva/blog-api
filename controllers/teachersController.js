// Importa o modelo de postagens
const postModel = require('../models/studentModel');
const { AppError, asyncHandler } = require('../middleware/errorHandler');

// Controlador para listar todos os estudantes
exports.getStudents = asyncHandler(async (req, res) => {
  console.log('Iniciando busca de estudantes...');

  // Busca todos os estudantes no banco de dados
  const students = await postModel.getAllStudents();
  
  console.log('estudantes encontrados:', students.length);
  
  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: {
      posts
    }
  });
});

// Controlador para buscar uma estudantes pelo ID
exports.getStudentsById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  // Validação do ID
  if (!id || isNaN(id)) {
    throw new AppError('ID inválido. Deve ser um número', 400);
  }
  
  console.log('Buscando post com ID:', id);
  
  // Busca a postagem pelo ID
  const post = await studentModel.getPostById(id);
  
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
exports.createStudent = asyncHandler(async (req, res) => {
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
exports.updateStudent = asyncHandler(async (req, res) => {
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
exports.deleteStudent = asyncHandler(async (req, res) => {
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
exports.searchStudents = asyncHandler(async (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    throw new AppError('Parâmetro "q" é obrigatório para busca', 400);
  }
  
  if (q.length < 2) {
    throw new AppError('Termo de busca deve ter pelo menos 2 caracteres', 400);
  }
  
  console.log('Buscando posts com termo:', q);
  
  // Busca postagens que correspondam ao termo
  const students = await studentModel.searchStudents(q);
  
  res.status(200).json({
    status: 'success',
    results: students.length,
    searchTerm: q,
    data: {
      students
    }
  });
});
