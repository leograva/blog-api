import request from 'supertest';
import app from '../app.js';

// Função para resetar o banco de dados antes de cada teste
async function resetDatabase() {
  // Implemente a lógica de reset do banco de dados aqui, por exemplo:
  // await db.query('DELETE FROM posts');
  // await db.query('DELETE FROM users');
}

describe('Posts API', () => {
  let createdPostId;

  beforeEach(async () => {
    await resetDatabase();
  });

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
    // Cria um post antes de listar
    await request(app)
      .post('/posts')
      .send({
        title: 'Novo Post',
        content: 'Conteúdo do post',
        author: 'Autor Teste'
      });
    const res = await request(app).get('/posts');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // Busca de post por ID
  it('should get a post by id', async () => {
    // Cria um post antes de buscar
    const createRes = await request(app)
      .post('/posts')
      .send({
        title: 'Novo Post',
        content: 'Conteúdo do post',
        author: 'Autor Teste'
      });
    const postId = createRes.body.id;
    expect(postId).toBeDefined();
    const res = await request(app).get(`/posts/${postId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', postId);
  });

  // Atualização de post
  it('should update a post', async () => {
    const createRes = await request(app)
      .post('/posts')
      .send({
        title: 'Post para atualizar',
        content: 'Conteúdo original',
        author: 'Autor'
      });
    const postId = createRes.body.id;
    const updateRes = await request(app)
      .put(`/posts/${postId}`)
      .send({
        title: 'Título Atualizado',
        content: 'Conteúdo atualizado',
        author: 'Autor'
      });
    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body).toHaveProperty('title', 'Título Atualizado');
    expect(updateRes.body).toHaveProperty('content', 'Conteúdo atualizado');
  });

  // Remoção de post
  it('should delete a post', async () => {
    const createRes = await request(app)
      .post('/posts')
      .send({
        title: 'Post para deletar',
        content: 'Conteúdo',
        author: 'Autor'
      });
    const postId = createRes.body.id;
    const deleteRes = await request(app).delete(`/posts/${postId}`);
    expect(deleteRes.statusCode).toBe(204);

    // Verifica se o post foi realmente removido
    const getRes = await request(app).get(`/posts/${postId}`);
    expect(getRes.statusCode).toBe(404);
  });

  // Testa erro ao buscar post inexistente
  it('should return 404 for non-existent post', async () => {
    const res = await request(app).get('/posts/999999');
    expect(res.statusCode).toBe(404);
  });

  // Testa erro ao atualizar post inexistente
  it('should return 404 when updating non-existent post', async () => {
    const res = await request(app)
      .put('/posts/999999')
      .send({
        title: 'Não existe',
        content: 'Não existe',
        author: 'Ninguém'
      });
    expect(res.statusCode).toBe(404);
  });

  // Testa erro ao deletar post inexistente
  it('should return 404 when deleting non-existent post', async () => {
    const res = await request(app).delete('/posts/999999');
    expect(res.statusCode).toBe(404);
  });

  // Testa validação de campos obrigatórios
  it('should return 400 when required fields are missing', async () => {
    const res = await request(app)
      .post('/posts')
      .send({
        title: '',
        content: '',
        author: ''
      });
    expect(res.statusCode).toBe(400);
  });
});