// Importa o modelo de estudantes
const studentModel = require('../models/studentModel');
const { AppError, asyncHandler } = require('../middleware/errorHandler');

/**
 * Controlador para listar todos os estudantes
 */
exports.getStudents = asyncHandler(async (req, res) => {
  console.log('Iniciando busca de estudantes...');

  const students = await studentModel.getAllStudents();

  console.log('Estudantes encontrados:', students.length);

  res.status(200).json({
    status: 'success',
    results: students.length,
    data: { students },
  });
});

/**
 * Controlador para buscar um estudante pelo ID
 */
exports.getStudentById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    throw new AppError('ID inválido. Deve ser um número', 400);
  }

  console.log('Buscando estudante com ID:', id);

  const student = await studentModel.getStudentById(id);

  if (!student) {
    throw new AppError('Estudante não encontrado', 404, { studentId: id });
  }

  res.status(200).json({
    status: 'success',
    data: { student },
  });
});

/**
 * Controlador para criar um novo estudante
 */
exports.createStudent = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  const missingFields = [];
  if (!name) missingFields.push('name');
  if (!email) missingFields.push('email');

  if (missingFields.length > 0) {
    throw new AppError('Campos obrigatórios não informados', 400, { missingFields });
  }

  console.log('Criando novo estudante:', { name, email });

  const newStudent = await studentModel.createStudent(name, email);

  res.status(201).json({
    status: 'success',
    message: 'Estudante criado com sucesso',
    data: { student: newStudent },
  });
});

/**
 * Controlador para atualizar um estudante existente
 */
exports.updateStudent = asyncHandler(async (req, res) => {
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

  console.log('Atualizando estudante ID:', id);

  const updatedStudent = await studentModel.updateStudent(id, name, email);

  if (!updatedStudent) {
    throw new AppError('Estudante não encontrado', 404, { studentId: id });
  }

  res.status(200).json({
    status: 'success',
    message: 'Estudante atualizado com sucesso',
    data: { student: updatedStudent },
  });
});

/**
 * Controlador para deletar um estudante
 */
exports.deleteStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    throw new AppError('ID inválido. Deve ser um número', 400);
  }

  console.log('Deletando estudante ID:', id);

  const deletedStudent = await studentModel.deleteStudent(id);

  if (!deletedStudent) {
    throw new AppError('Estudante não encontrado', 404, { studentId: id });
  }

  res.status(200).json({
    status: 'success',
    message: 'Estudante deletado com sucesso',
    data: { student: deletedStudent },
  });
});

/**
 * Controlador para buscar estudantes por termo de pesquisa
 */
exports.searchStudents = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (!q) {
    throw new AppError('Parâmetro "q" é obrigatório para busca', 400);
  }

  if (q.length < 2) {
    throw new AppError('Termo de busca deve ter pelo menos 2 caracteres', 400);
  }

  console.log('Buscando estudantes com termo:', q);

  const students = await studentModel.searchStudents(q);

  res.status(200).json({
    status: 'success',
    results: students.length,
    searchTerm: q,
    data: { students },
  });
});
