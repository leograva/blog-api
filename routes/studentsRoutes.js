const express = require('express');
const router = express.Router();

/**
 * Controlador responsável por gerenciar as operações relacionadas aos estudantes.
 */
const studentsController = require('../controllers/studentsController');

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Endpoints de gerenciamento de estudantes
 */

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Lista todos os estudantes
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Lista de estudantes
 */
router.get('/', studentsController.getStudents);

/**
 * @swagger
 * /students/search:
 *   get:
 *     summary: Busca estudantes por palavra-chave
 *     tags: [Students]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Termo de busca
 *     responses:
 *       200:
 *         description: Lista de estudantes encontrados
 */
router.get('/search', studentsController.searchStudents);

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Retorna um estudante específico
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estudante encontrado
 *       404:
 *         description: Estudante não encontrado
 */
router.get('/:id', studentsController.getStudentById);

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Cria um novo estudante
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Estudante criado com sucesso
 */
router.post('/', studentsController.createStudent);

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Atualiza um estudante existente
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Estudante atualizado com sucesso
 */
router.put('/:id', studentsController.updateStudent);

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Deleta um estudante existente
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estudante deletado
 */
router.delete('/:id', studentsController.deleteStudent);

module.exports = router;
