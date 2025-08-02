module.exports = {
  // Ambiente de teste Node.js
  testEnvironment: 'node',
  
  // Padrão para encontrar arquivos de teste
  testMatch: ['**/tests/**/*.test.js'],
  
  // Cobertura de código
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  
  // Arquivos a serem incluídos na cobertura
  collectCoverageFrom: [
    'controllers/**/*.js',
    'models/**/*.js',
    'middleware/**/*.js',
    'routes/**/*.js',
    'app.js',
    '!**/node_modules/**',
    '!coverage/**',
    '!tests/**'
  ],
  
  // Configurações de setup e teardown
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js', '<rootDir>/tests/teardown.js'],
  
  // Timeout para testes (30 segundos)
  testTimeout: 30000,
  
  // Limpar mocks automaticamente entre testes
  clearMocks: true,
  
  // Detectar arquivos abertos automaticamente
  detectOpenHandles: true,
  
  // Forçar saída após testes
  forceExit: true
};
