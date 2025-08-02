const { closeDatabase } = require('./helpers/database');

// Hook global para limpar após todos os testes
afterAll(async () => {
  // Fechar conexões do banco de dados
  await closeDatabase();
  
  // Aguardar um pouco para garantir que tudo foi fechado
  await new Promise(resolve => setTimeout(resolve, 1000));
});
