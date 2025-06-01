const express = require('express');
const router = express.Router();
/**
 * Controlador responsável por gerenciar as operações relacionadas aos posts.
 * Importa as funções de manipulação de posts do diretório controllers.
 * 
 * @module postsController
 */
const postsController = require('../controllers/postsController');

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Lista todas as postagens
 *     responses:
 *       200:
 *         description: Lista de postagens
 */
router.get('/', postsController.getPosts);

/**
 * @swagger
 * /posts/search:
 *   get:
 *     summary: Busca postagens por palavra-chave
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Termo de busca
 *     responses:
 *       200:
 *         description: Lista de postagens encontradas
 */
router.get('/search', postsController.searchPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Retorna um post específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post encontrado
 *       404:
 *         description: Post não encontrado
 */
router.get('/:id', postsController.getPostById);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Cria uma nova postagem
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
router.post('/', postsController.createPost);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Atualiza um post existente
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
 *         description: Post atualizado com sucesso
 */
router.put('/:id', postsController.updatePost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Deleta uma postagem
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post deletado
 */
router.delete('/:id', postsController.deletePost);

module.exports = router;