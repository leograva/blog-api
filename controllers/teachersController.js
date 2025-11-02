// Importa o modelo de professores
const teachersModel = require('../models/teacherModel');
const { AppError, asyncHandler } = require('../middleware/errorHandler');

/**
 * Controlador para listar todos os professores
 */
exports.getTeachers = asyncHandler(async (req, res) => {
  console.log('Iniciando busca de professores...');

  const teachers = await teachersModel.getAllTeachers();

  console.log('Professores encontrados:', teachers.length);

  res.status(200).json({
    status: 'success',
    results: teachers.length,
    data: { teachers },
  });
});

/**
 * Controlador para buscar um professor pelo ID
 */
exports.getTeacherById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    throw new AppError('ID inválido. Deve ser um número', 400);
  }

  console.log('Buscando professor com ID:', id);

  const teacher = await teachersModel.getTeacherById(id);

  if (!teacher) {
    throw new AppError('Professor não encontrado', 404, { teacherId: id });
  }

  res.status(200).json({
    status: 'success',
    data: { teacher },
  });
});

/**
 * Controlador para criar um novo professor
 */
exports.createTeacher = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  const missingFields = [];
  if (!name) missingFields.push('name');
  if (!email) missingFields.push('email');

  if (missingFields.length > 0) {
    throw new AppError('Campos obrigatórios não informados', 400, { missingFields });
  }

  console.log('Criando novo professor:', { name, email });

  const newTeacher = await teachersModel.createTeacher(name, email);

  res.status(201).json({
    status: 'success',
    message: 'Professor criado com sucesso',
    data: { teacher: newTeacher },
  });
});

/**
 * Controlador para atualizar um professor existente
 */
exports.updateTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (!id || isNaN(id)) {
    throw new AppError('ID inválido. Deve ser um número', 400);
  }

  const missingFields = [];
  if (!name) missingFields.push('name');
  if (!email) missingFields.push('email');

  if (missingFields.length > 0) {
    throw new AppError('Campos obrigatórios não informados', 400, { missingFields });
  }

  console.log('Atualizando professor ID:', id);

  const updatedTeacher = await teachersModel.updateTeacher(id, name, email);

  if (!updatedTeacher) {
    throw new AppError('Professor não encontrado', 404, { teacherId: id });
  }

  res.status(200).json({
    status: 'success',
    message: 'Professor atualizado com sucesso',
    data: { teacher: updatedTeacher },
  });
});

/**
 * Controlador para deletar um professor
 */
exports.deleteTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    throw new AppError('ID inválido. Deve ser um número', 400);
  }

  console.log('Deletando professor ID:', id);

  const deletedTeacher = await teachersModel.deleteTeacher(id);

  if (!deletedTeacher) {
    throw new AppError('Professor não encontrado', 404, { teacherId: id });
  }

  res.status(200).json({
    status: 'success',
    message: 'Professor deletado com sucesso',
    data: { teacher: deletedTeacher },
  });
});

/**
 * Controlador para buscar professores por termo de pesquisa
 */
exports.searchTeachers = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (!q) {
    throw new AppError('Parâmetro "q" é obrigatório para busca', 400);
  }

  if (q.length < 2) {
    throw new AppError('Termo de busca deve ter pelo menos 2 caracteres', 400);
  }

  console.log('Buscando professores com termo:', q);

  const teachers = await teachersModel.searchTeachers(q);

  res.status(200).json({
    status: 'success',
    results: teachers.length,
    searchTerm: q,
    data: { teachers },
  });
});
