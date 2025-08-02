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
});