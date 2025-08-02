const postsController = require('../controllers/postsController');
const postModel = require('../models/postModel');
const { AppError } = require('../middleware/errorHandler');

// Mock do modelo
jest.mock('../models/postModel');

describe('Posts Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      params: {},
      body: {},
      query: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe('getPosts', () => {
    test('deve retornar todos os posts com sucesso', async () => {
      const mockPosts = [
        { id: 1, title: 'Post 1', content: 'Conteúdo 1', author: 'Autor 1' },
        { id: 2, title: 'Post 2', content: 'Conteúdo 2', author: 'Autor 2' }
      ];

      postModel.getAllPosts.mockResolvedValue(mockPosts);

      await postsController.getPosts(req, res, next);

      expect(postModel.getAllPosts).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        results: 2,
        data: {
          posts: mockPosts
        }
      });
    });

    test('deve retornar lista vazia quando não há posts', async () => {
      postModel.getAllPosts.mockResolvedValue([]);

      await postsController.getPosts(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        results: 0,
        data: {
          posts: []
        }
      });
    });
  });

  describe('getPostById', () => {
    test('deve retornar post específico pelo ID', async () => {
      const mockPost = { id: 1, title: 'Post Teste', content: 'Conteúdo', author: 'Autor' };
      req.params.id = '1';

      postModel.getPostById.mockResolvedValue(mockPost);

      await postsController.getPostById(req, res, next);

      expect(postModel.getPostById).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: {
          post: mockPost
        }
      });
    });

    test('deve lançar erro 400 para ID inválido', async () => {
      req.params.id = 'abc';

      await postsController.getPostById(req, res, next);

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'ID inválido. Deve ser um número',
          statusCode: 400
        })
      );
    });
  });

  describe('createPost', () => {
    test('deve criar post com dados válidos', async () => {
      const newPostData = {
        title: 'Novo Post',
        content: 'Conteúdo do novo post',
        author: 'Novo Autor'
      };
      const createdPost = { id: 1, ...newPostData, created_at: new Date() };

      req.body = newPostData;
      postModel.createPost.mockResolvedValue(createdPost);

      await postsController.createPost(req, res, next);

      expect(postModel.createPost).toHaveBeenCalledWith(
        newPostData.title,
        newPostData.content,
        newPostData.author
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Post criado com sucesso',
        data: {
          post: createdPost
        }
      });
    });

    test('deve lançar erro 400 para campos obrigatórios ausentes', async () => {
      req.body = { title: 'Apenas título' }; // content e author ausentes

      await postsController.createPost(req, res, next);

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Campos obrigatórios não informados',
          statusCode: 400,
          details: expect.objectContaining({
            missingFields: ['content', 'author']
          })
        })
      );
    });

    test('deve lançar erro 400 para título muito curto', async () => {
      req.body = {
        title: 'AB', // Menos de 3 caracteres
        content: 'Conteúdo válido',
        author: 'Autor válido'
      };

      await postsController.createPost(req, res, next);

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Título deve ter pelo menos 3 caracteres',
          statusCode: 400
        })
      );
    });

    test('deve lançar erro 400 para conteúdo muito curto', async () => {
      req.body = {
        title: 'Título válido',
        content: 'Curto', // Menos de 10 caracteres
        author: 'Autor válido'
      };

      await postsController.createPost(req, res, next);

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Conteúdo deve ter pelo menos 10 caracteres',
          statusCode: 400
        })
      );
    });
  });

  describe('updatePost', () => {
    test('deve atualizar post existente', async () => {
      const updateData = {
        title: 'Título Atualizado',
        content: 'Conteúdo atualizado',
        author: 'Autor atualizado'
      };
      const updatedPost = { id: 1, ...updateData };

      req.params.id = '1';
      req.body = updateData;
      postModel.updatePost.mockResolvedValue(updatedPost);

      await postsController.updatePost(req, res, next);

      expect(postModel.updatePost).toHaveBeenCalledWith(
        '1',
        updateData.title,
        updateData.content,
        updateData.author
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Post atualizado com sucesso',
        data: {
          post: updatedPost
        }
      });
    });
  });

  describe('deletePost', () => {
    test('deve deletar post existente', async () => {
      const deletedPost = { id: 1, title: 'Post Deletado', content: 'Conteúdo', author: 'Autor' };
      
      req.params.id = '1';
      postModel.deletePost.mockResolvedValue(deletedPost);

      await postsController.deletePost(req, res, next);

      expect(postModel.deletePost).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Post deletado com sucesso',
        data: {
          deletedPost: deletedPost
        }
      });
    });
  });

  describe('searchPosts', () => {
    test('deve buscar posts com termo válido', async () => {
      const searchResults = [
        { id: 1, title: 'Post JavaScript', content: 'Conteúdo', author: 'Autor' }
      ];
      
      req.query.q = 'JavaScript';
      postModel.searchPosts.mockResolvedValue(searchResults);

      await postsController.searchPosts(req, res, next);

      expect(postModel.searchPosts).toHaveBeenCalledWith('JavaScript');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        results: 1,
        searchTerm: 'JavaScript',
        data: {
          posts: searchResults
        }
      });
    });

    test('deve lançar erro 400 para parâmetro q ausente', async () => {
      req.query = {}; // Sem parâmetro q

      await postsController.searchPosts(req, res, next);

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Parâmetro "q" é obrigatório para busca',
          statusCode: 400
        })
      );
    });

    test('deve lançar erro 400 para termo muito curto', async () => {
      req.query.q = 'a'; // Menos de 2 caracteres

      await postsController.searchPosts(req, res, next);

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Termo de busca deve ter pelo menos 2 caracteres',
          statusCode: 400
        })
      );
    });
  });
});
