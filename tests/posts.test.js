const request = require('supertest');
const app = require('../app');

describe('Posts API', () => {
  let createdPostId;

  // Criação de post
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
    createdPostId = res.body.id;
  });

  // Listagem de posts
  it('should list all posts', async () => {
    const res = await request(app).get('/posts');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Busca de post por ID
  it('should get a post by id', async () => {
    expect(createdPostId).toBeDefined();
    const res = await request(app).get(`/posts/${createdPostId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', createdPostId);
  });
});