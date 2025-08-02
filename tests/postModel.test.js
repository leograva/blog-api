const postModel = require('../models/postModel');
const { clearDatabase, seedDatabase, createTestPost } = require('./helpers/database');

describe('Post Model', () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  describe('getAllPosts', () => {
    test('deve retornar array vazio quando não há posts', async () => {
      const posts = await postModel.getAllPosts();
      expect(posts).toEqual([]);
    });

    test('deve retornar todos os posts ordenados por data de criação (mais recente primeiro)', async () => {
      await seedDatabase();
      const posts = await postModel.getAllPosts();
      
      expect(posts).toHaveLength(3);
      expect(posts[0]).toHaveProperty('id');
      expect(posts[0]).toHaveProperty('title');
      expect(posts[0]).toHaveProperty('content');
      expect(posts[0]).toHaveProperty('author');
      expect(posts[0]).toHaveProperty('created_at');
      
      // Verifica se está ordenado por data (mais recente primeiro)
      const dates = posts.map(post => new Date(post.created_at));
      for (let i = 0; i < dates.length - 1; i++) {
        expect(dates[i].getTime()).toBeGreaterThanOrEqual(dates[i + 1].getTime());
      }
    });
  });

  describe('getPostById', () => {
    test('deve retornar undefined para ID inexistente', async () => {
      const post = await postModel.getPostById(999);
      expect(post).toBeUndefined();
    });

    test('deve retornar o post correto pelo ID', async () => {
      const testPost = await createTestPost({
        title: 'Post Específico',
        content: 'Conteúdo específico para teste',
        author: 'Autor Específico'
      });

      const foundPost = await postModel.getPostById(testPost.id);
      
      expect(foundPost).toBeDefined();
      expect(foundPost.id).toBe(testPost.id);
      expect(foundPost.title).toBe('Post Específico');
      expect(foundPost.content).toBe('Conteúdo específico para teste');
      expect(foundPost.author).toBe('Autor Específico');
    });
  });

  describe('createPost', () => {
    test('deve criar um novo post com sucesso', async () => {
      const postData = {
        title: 'Novo Post',
        content: 'Conteúdo do novo post',
        author: 'Novo Autor'
      };

      const newPost = await postModel.createPost(
        postData.title,
        postData.content,
        postData.author
      );

      expect(newPost).toBeDefined();
      expect(newPost.id).toBeDefined();
      expect(newPost.title).toBe(postData.title);
      expect(newPost.content).toBe(postData.content);
      expect(newPost.author).toBe(postData.author);
      expect(newPost.created_at).toBeDefined();
    });

    test('deve criar posts com IDs únicos', async () => {
      const post1 = await postModel.createPost('Título 1', 'Conteúdo 1', 'Autor 1');
      const post2 = await postModel.createPost('Título 2', 'Conteúdo 2', 'Autor 2');

      expect(post1.id).not.toBe(post2.id);
    });
  });

  describe('updatePost', () => {
    test('deve atualizar um post existente', async () => {
      const originalPost = await createTestPost();
      
      const updatedPost = await postModel.updatePost(
        originalPost.id,
        'Título Atualizado',
        'Conteúdo Atualizado',
        'Autor Atualizado'
      );

      expect(updatedPost).toBeDefined();
      expect(updatedPost.id).toBe(originalPost.id);
      expect(updatedPost.title).toBe('Título Atualizado');
      expect(updatedPost.content).toBe('Conteúdo Atualizado');
      expect(updatedPost.author).toBe('Autor Atualizado');
    });

    test('deve retornar undefined para ID inexistente', async () => {
      const result = await postModel.updatePost(
        999,
        'Título',
        'Conteúdo',
        'Autor'
      );

      expect(result).toBeUndefined();
    });
  });

  describe('deletePost', () => {
    test('deve deletar um post existente', async () => {
      const testPost = await createTestPost();
      
      const deletedPost = await postModel.deletePost(testPost.id);
      
      expect(deletedPost).toBeDefined();
      expect(deletedPost.id).toBe(testPost.id);
      
      // Verifica se o post foi realmente deletado
      const searchResult = await postModel.getPostById(testPost.id);
      expect(searchResult).toBeUndefined();
    });

    test('deve retornar undefined para ID inexistente', async () => {
      const result = await postModel.deletePost(999);
      expect(result).toBeUndefined();
    });
  });

  describe('searchPosts', () => {
    beforeEach(async () => {
      await seedDatabase();
    });

    test('deve encontrar posts por título', async () => {
      const results = await postModel.searchPosts('JavaScript');
      
      expect(results).toHaveLength(1);
      expect(results[0].title).toContain('JavaScript');
    });

    test('deve encontrar posts por conteúdo', async () => {
      const results = await postModel.searchPosts('primeiro');
      
      expect(results).toHaveLength(1);
      expect(results[0].content).toContain('primeiro');
    });

    test('deve ser case-insensitive', async () => {
      const results = await postModel.searchPosts('JAVASCRIPT');
      
      expect(results).toHaveLength(1);
      expect(results[0].title).toContain('JavaScript');
    });

    test('deve retornar array vazio para termo não encontrado', async () => {
      const results = await postModel.searchPosts('termo_inexistente');
      
      expect(results).toEqual([]);
    });

    test('deve encontrar múltiplos posts que correspondem ao termo', async () => {
      const results = await postModel.searchPosts('Teste');
      
      expect(results.length).toBeGreaterThan(1);
      results.forEach(post => {
        expect(
          post.title.toLowerCase().includes('teste') ||
          post.content.toLowerCase().includes('teste')
        ).toBe(true);
      });
    });
  });
});
