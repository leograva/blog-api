const express = require('express');
const router = express.Router();
/**
 * Controlador responsável por gerenciar as operações relacionadas aos teachers.
 * Importa as funções de manipulação de teachers do diretório controllers.
 * 
 * @module teachersController
 */
const teachersController = require('../controllers/teachersController');

/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Lista todos os Professors
 *     responses:
 *       200:
 *         description: Lista de Professors
 */
router.get('/', teachersController.getTeachers);

/**
 * @swagger
 * /teachers/search:
 *   get:
 *     summary: Busca Professors por palavra-chave
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Termo de busca
 *     responses:
 *       200:
 *         description: Lista de Professors encontrados
 */
router.get('/search', teachersController.searchTeachers);

/**
 * @swagger
 * /teachers/{id}:
 *   get:
 *     summary: Retorna um Professor específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Professor encontrado
 *       404:
 *         description: Professor não encontrado
 */
router.get('/:id', teachersController.getTeacherById);

/**
 * @swagger
 * /teachers:
 *   post:
 *     summary: Cria um novo Professor
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
 *         description: Professor criado com sucesso
 */
router.post('/', teachersController.createTeacher);

/**
 * @swagger
 * /teachers/{id}:
 *   put:
 *     summary: Atualiza um Professor existente
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
 *         description: Professor atualizado com sucesso
 */
router.put('/:id', teachersController.updateTeacher);

/**
 * @swagger
 * /teachers/{id}:
 *   delete:
 *     summary: Deleta um Professor existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Professor deletado
 */
router.delete('/:id', teachersController.deleteTeacher);

module.exports = router;