const request = require('supertest');
const app = require('../app');

describe('Posts API', () => {
  let createdPostId;

  // Teste de criação de post
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/posts')
      .send({
        title: 'Novo Post',
        content: 'Conteúdo do post',
        author: 'Autor Teste'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Novo Post');
    createdPostId = res.body.id;
  });

  // Teste de listagem de posts
  it('should list all posts', async () => {
    const res = await request(app).get('/posts');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Teste de busca de post por ID
  it('should get a post by id', async () => {
    expect(createdPostId).toBeDefined();
    const res = await request(app).get(`/posts/${createdPostId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', createdPostId);
  });

  // Teste de atualização de post
  it('should update a post', async () => {
    expect(createdPostId).toBeDefined();
    const res = await request(app)
      .put(`/posts/${createdPostId}`)
      .send({ title: 'Post Atualizado' });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Post Atualizado');
  });

  // Teste de deleção de post
  it('should delete a post', async () => {
    expect(createdPostId).toBeDefined();
    const res = await request(app).delete(`/posts/${createdPostId}`);
    expect(res.statusCode).toBe(204);
  });

  // Teste de erro ao buscar post inexistente
  it('should return 404 for non-existing post', async () => {
    const res = await request(app).get('/posts/999999');
    expect(res.statusCode).toBe(404);
  });

  // Teste de erro ao criar post sem dados obrigatórios
  it('should return 400 when required fields are missing', async () => {
    const res = await request(app)
      .post('/posts')
      .send({ title: '' });
    expect(res.statusCode).toBe(400);
  });
});