const request = require('supertest');
const app = require('../app');
const { clearDatabase, seedDatabase, createTestPost } = require('./helpers/database');

describe('Posts API', () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  describe('GET /posts', () => {
    test('deve retornar lista vazia quando não há posts', async () => {
      const response = await request(app)
        .get('/posts')
        .expect(200);

      expect(response.body).toMatchObject({
        status: 'success',
        results: 0,
        data: {
          posts: []
        }
      });
    });

    test('deve retornar todos os posts', async () => {
      await seedDatabase();

      const response = await request(app)
        .get('/posts')
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.results).toBe(3);
      expect(response.body.data.posts).toHaveLength(3);
      
      // Verifica estrutura de um post
      const post = response.body.data.posts[0];
      expect(post).toHaveProperty('id');
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('content');
      expect(post).toHaveProperty('author');
      expect(post).toHaveProperty('created_at');
    });
  });

  describe('GET /posts/:id', () => {
    test('deve retornar um post específico pelo ID', async () => {
      const testPost = await createTestPost({
        title: 'Post Específico',
        content: 'Conteúdo específico',
        author: 'Autor Específico'
      });

      const response = await request(app)
        .get(`/posts/${testPost.id}`)
        .expect(200);

      expect(response.body).toMatchObject({
        status: 'success',
        data: {
          post: {
            id: testPost.id,
            title: 'Post Específico',
            content: 'Conteúdo específico',
            author: 'Autor Específico'
          }
        }
      });
    });

    test('deve retornar 404 para post inexistente', async () => {
      const response = await request(app)
        .get('/posts/999')
        .expect(404);

      expect(response.body).toMatchObject({
        status: 'error',
        message: 'Post não encontrado'
      });
    });

    test('deve retornar 400 para ID inválido', async () => {
      const response = await request(app)
        .get('/posts/abc')
        .expect(400);

      expect(response.body).toMatchObject({
        status: 'error',
        message: 'ID inválido. Deve ser um número'
      });
    });
  });

  describe('POST /posts', () => {
    test('deve criar um novo post com dados válidos', async () => {
      const newPost = {
        title: 'Novo Post de Teste',
        content: 'Conteúdo do novo post de teste',
        author: 'Autor do Teste'
      };

      const response = await request(app)
        .post('/posts')
        .send(newPost)
        .expect(201);

      expect(response.body).toMatchObject({
        status: 'success',
        message: 'Post criado com sucesso',
        data: {
          post: {
            title: newPost.title,
            content: newPost.content,
            author: newPost.author
          }
        }
      });

      expect(response.body.data.post.id).toBeDefined();
      expect(response.body.data.post.created_at).toBeDefined();
    });

    test('deve retornar 400 para campos obrigatórios ausentes', async () => {
      const incompletePost = {
        title: 'Apenas título'
        // content e author ausentes
      };

      const response = await request(app)
        .post('/posts')
        .send(incompletePost)
        .expect(400);

      expect(response.body).toMatchObject({
        status: 'error',
        message: 'Campos obrigatórios não informados'
      });

      expect(response.body.details.missingFields).toContain('content');
      expect(response.body.details.missingFields).toContain('author');
    });

    test('deve retornar 400 para título muito curto', async () => {
      const invalidPost = {
        title: 'AB', // Menos de 3 caracteres
        content: 'Conteúdo válido',
        author: 'Autor válido'
      };

      const response = await request(app)
        .post('/posts')
        .send(invalidPost)
        .expect(400);

      expect(response.body).toMatchObject({
        status: 'error',
        message: 'Título deve ter pelo menos 3 caracteres'
      });
    });

    test('deve retornar 400 para conteúdo muito curto', async () => {
      const invalidPost = {
        title: 'Título válido',
        content: 'Curto', // Menos de 10 caracteres
        author: 'Autor válido'
      };

      const response = await request(app)
        .post('/posts')
        .send(invalidPost)
        .expect(400);

      expect(response.body).toMatchObject({
        status: 'error',
        message: 'Conteúdo deve ter pelo menos 10 caracteres'
      });
    });

    test('deve retornar 400 para JSON mal formado', async () => {
      const response = await request(app)
        .post('/posts')
        .send('{"title": "Teste", "content":}') // JSON inválido
        .set('Content-Type', 'application/json')
        .expect(400);

      expect(response.body).toMatchObject({
        status: 'error',
        message: 'JSON mal formado'
      });
    });
  });

  describe('PUT /posts/:id', () => {
    test('deve atualizar um post existente', async () => {
      const testPost = await createTestPost();
      
      const updatedData = {
        title: 'Título Atualizado',
        content: 'Conteúdo atualizado com mais informações',
        author: 'Autor Atualizado'
      };

      const response = await request(app)
        .put(`/posts/${testPost.id}`)
        .send(updatedData)
        .expect(200);

      expect(response.body).toMatchObject({
        status: 'success',
        message: 'Post atualizado com sucesso',
        data: {
          post: {
            id: testPost.id,
            title: updatedData.title,
            content: updatedData.content,
            author: updatedData.author
          }
        }
      });
    });

    test('deve retornar 404 para post inexistente', async () => {
      const updateData = {
        title: 'Título',
        content: 'Conteúdo',
        author: 'Autor'
      };

      const response = await request(app)
        .put('/posts/999')
        .send(updateData)
        .expect(404);

      expect(response.body).toMatchObject({
        status: 'error',
        message: 'Post não encontrado'
      });
    });

    test('deve retornar 400 para ID inválido', async () => {
      const updateData = {
        title: 'Título',
        content: 'Conteúdo',
        author: 'Autor'
      };

      const response = await request(app)
        .put('/posts/abc')
        .send(updateData)
        .expect(400);

      expect(response.body).toMatchObject({
        status: 'error',
        message: 'ID inválido. Deve ser um número'
      });
    });
  });

  describe('DELETE /posts/:id', () => {
    test('deve deletar um post existente', async () => {
      const testPost = await createTestPost();

      const response = await request(app)
        .delete(`/posts/${testPost.id}`)
        .expect(200);

      expect(response.body).toMatchObject({
        status: 'success',
        message: 'Post deletado com sucesso',
        data: {
          deletedPost: {
            id: testPost.id,
            title: testPost.title,
            content: testPost.content,
            author: testPost.author
          }
        }
      });

      // Verifica se o post foi realmente deletado
      await request(app)
        .get(`/posts/${testPost.id}`)
        .expect(404);
    });

    test('deve retornar 404 para post inexistente', async () => {
      const response = await request(app)
        .delete('/posts/999')
        .expect(404);

      expect(response.body).toMatchObject({
        status: 'error',
        message: 'Post não encontrado'
      });
    });

    test('deve retornar 400 para ID inválido', async () => {
      const response = await request(app)
        .delete('/posts/abc')
        .expect(400);

      expect(response.body).toMatchObject({
        status: 'error',
        message: 'ID inválido. Deve ser um número'
      });
    });
  });

  describe('GET /posts/search', () => {
    beforeEach(async () => {
      await seedDatabase();
    });

    test('deve buscar posts por termo no título', async () => {
      const response = await request(app)
        .get('/posts/search?q=JavaScript')
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.searchTerm).toBe('JavaScript');
      expect(response.body.results).toBe(1);
      expect(response.body.data.posts[0].title).toContain('JavaScript');
    });

    test('deve buscar posts por termo no conteúdo', async () => {
      const response = await request(app)
        .get('/posts/search?q=primeiro')
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.results).toBe(1);
      expect(response.body.data.posts[0].content).toContain('primeiro');
    });

    test('deve retornar 400 para parâmetro q ausente', async () => {
      const response = await request(app)
        .get('/posts/search')
        .expect(400);

      expect(response.body).toMatchObject({
        status: 'error',
        message: 'Parâmetro "q" é obrigatório para busca'
      });
    });

    test('deve retornar 400 para termo de busca muito curto', async () => {
      const response = await request(app)
        .get('/posts/search?q=a')
        .expect(400);

      expect(response.body).toMatchObject({
        status: 'error',
        message: 'Termo de busca deve ter pelo menos 2 caracteres'
      });
    });

    test('deve retornar lista vazia para termo não encontrado', async () => {
      const response = await request(app)
        .get('/posts/search?q=termo_inexistente')
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.results).toBe(0);
      expect(response.body.data.posts).toEqual([]);
    });
  });
});
