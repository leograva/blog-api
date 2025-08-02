// Teste simples para verificar se a configuração está funcionando
describe('Configuração de Testes', () => {
  test('deve executar teste básico', () => {
    expect(1 + 1).toBe(2);
  });

  test('deve ter acesso às variáveis de ambiente', () => {
    expect(process.env.NODE_ENV).toBeDefined();
    expect(process.env.DB_HOST).toBeDefined();
    expect(process.env.DB_USER).toBeDefined();
  });

  test('Jest deve estar configurado corretamente', () => {
    expect(jest).toBeDefined();
    expect(expect).toBeDefined();
  });
});
