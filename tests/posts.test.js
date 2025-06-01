const request = require('supertest');
const app = require('../app'); // certifique-se de exportar o app.js como módulo

describe('POST /posts', () => {
  it('deve criar um novo post', async () => {
    const res = await request(app)
      .post('/posts')
      .send({
        title: 'Test Post',
        content: 'Conteúdo de teste',
        author: 'Autor Teste'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });
});