const express = require('express');
const router = express.Router();

/**
 * Controlador responsável por gerenciar as operações relacionadas aos professores.
 */
const teachersController = require('../controllers/teachersController');

/**
 * @swagger
 * tags:
 *   name: Teachers
 *   description: Endpoints de gerenciamento de professores
 */

/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Lista todos os professores
 *     tags: [Teachers]
 *     responses:
 *       200:
 *         description: Lista de professores
 */
router.get('/', teachersController.getTeachers);

/**
 * @swagger
 * /teachers/search:
 *   get:
 *     summary: Busca professores por palavra-chave
 *     tags: [Teachers]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Termo de busca
 *     responses:
 *       200:
 *         description: Lista de professores encontrados
 */
router.get('/search', teachersController.searchTeachers);

/**
 * @swagger
 * /teachers/{id}:
 *   get:
 *     summary: Retorna um professor específico
 *     tags: [Teachers]
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
 *     summary: Cria um novo professor
 *     tags: [Teachers]
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
 *     responses:
 *       201:
 *         description: Professor criado com sucesso
 */
router.post('/', teachersController.createTeacher);

/**
 * @swagger
 * /teachers/{id}:
 *   put:
 *     summary: Atualiza um professor existente
 *     tags: [Teachers]
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
 *             properties:
 *               name:
 *                 type: string
 *               email:
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
 *     summary: Deleta um professor existente
 *     tags: [Teachers]
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
