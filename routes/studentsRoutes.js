const express = require('express');
const router = express.Router();
/**
 * Controlador responsável por gerenciar as operações relacionadas aos students.
 * Importa as funções de manipulação de students do diretório controllers.
 * 
 * @module studentsController
 */
const studentsController = require('../controllers/studentsController');

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Lista todos os estudantes
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
 *     summary: Cria uma nova estudante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 */
router.post('/', studentsController.createPost);

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Atualiza um estudante existente
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
 *               - title
 *               - content
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
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