const request = require('supertest');
const app = require('../app');

describe('POST /posts', () => {
  it('deve criar um novo post', async () => {
    const res = await request(app)
      .post('/posts')
      .send({
        title: 'Test Post',
        content: 'Conteúdo de teste',
        author: 'Autor Teste'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('deve retornar 400 ao criar post sem título', async () => {
    const res = await request(app)
      .post('/posts')
      .send({
        content: 'Conteúdo sem título',
        author: 'Autor Teste'
      });
    expect(res.statusCode).toBe(400);
  });

  it('deve retornar 400 ao criar post sem conteúdo', async () => {
    const res = await request(app)
      .post('/posts')
      .send({
        title: 'Sem Conteúdo',
        author: 'Autor Teste'
      });
    expect(res.statusCode).toBe(400);
  });

  it('deve retornar 400 ao criar post sem autor', async () => {
    const res = await request(app)
      .post('/posts')
      .send({
        title: 'Sem Autor',
        content: 'Conteúdo'
      });
    expect(res.statusCode).toBe(400);
  });
});

describe('GET /posts', () => {
  it('deve retornar uma lista de posts', async () => {
    const res = await request(app).get('/posts');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /posts/:id', () => {
  it('deve retornar um post existente', async () => {
    const postRes = await request(app)
      .post('/posts')
      .send({
        title: 'Post para buscar',
        content: 'Conteúdo',
        author: 'Autor'
      });
    const id = postRes.body.id;

    const res = await request(app).get(`/posts/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', id);
  });

  it('deve retornar 404 para post inexistente', async () => {
    const res = await request(app).get('/posts/999999');
    expect(res.statusCode).toBe(404);
  });
});

describe('PUT /posts/:id', () => {
  it('deve atualizar um post existente', async () => {
    const postRes = await request(app)
      .post('/posts')
      .send({
        title: 'Post para atualizar',
        content: 'Conteúdo',
        author: 'Autor'
      });
    const id = postRes.body.id;

    const res = await request(app)
      .put(`/posts/${id}`)
      .send({
        title: 'Título Atualizado',
        content: 'Conteúdo Atualizado',
        author: 'Autor Atualizado'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Título Atualizado');
  });

  it('deve retornar 404 ao tentar atualizar post inexistente', async () => {
    const res = await request(app)
      .put('/posts/999999')
      .send({
        title: 'Qualquer',
        content: 'Qualquer',
        author: 'Qualquer'
      });
    expect(res.statusCode).toBe(404);
  });
});

describe('DELETE /posts/:id', () => {
  it('deve deletar um post existente', async () => {
    const postRes = await request(app)
      .post('/posts')
      .send({
        title: 'Post para deletar',
        content: 'Conteúdo',
        author: 'Autor'
      });
    const id = postRes.body.id;

    const res = await request(app).delete(`/posts/${id}`);
    expect(res.statusCode).toBe(204);
  });

  it('deve retornar 404 ao tentar deletar post inexistente', async () => {
    const res = await request(app).delete('/posts/999999');
    expect(res.statusCode).toBe(404);
  });
});
