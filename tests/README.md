# Testes Automatizados - Blog API

Este documento descreve a configuração e implementação dos testes automatizados para a API de Blog usando Jest.

## 📋 Sumário dos Testes

### ✅ Testes Implementados
- **52 testes passando**
- **4 suítes de teste**
- **79.25% de cobertura geral**

### 📊 Cobertura por Módulo
- **Controllers**: 92.95% (postsController.js)
- **Models**: 86.66% (postModel.js)
- **Routes**: 100% (postsRoutes.js)
- **App**: 86.36% (app.js)
- **Middleware**: 50.9% (errorHandler.js)

## 🧪 Tipos de Teste

### 1. Testes de Modelo (Unit Tests)
**Arquivo**: `tests/postModel.test.js`

Testa todas as funções do modelo de dados:
- ✅ `getAllPosts()` - Busca todos os posts
- ✅ `getPostById()` - Busca post por ID
- ✅ `createPost()` - Criação de posts
- ✅ `updatePost()` - Atualização de posts
- ✅ `deletePost()` - Exclusão de posts
- ✅ `searchPosts()` - Busca por termo

### 2. Testes de Controller (Unit Tests)
**Arquivo**: `tests/postsController.test.js`

Testa os controllers com mocks:
- ✅ Listagem de posts
- ✅ Busca de post por ID
- ✅ Criação de posts
- ✅ Atualização de posts
- ✅ Exclusão de posts
- ✅ Busca de posts
- ✅ Validações de entrada
- ✅ Tratamento de erros

### 3. Testes de Integração (Integration Tests)
**Arquivo**: `tests/postsApi.test.js`

Testa a API completa com SuperTest:
- ✅ **GET /posts** - Listar posts
- ✅ **GET /posts/:id** - Buscar post específico
- ✅ **POST /posts** - Criar novo post
- ✅ **PUT /posts/:id** - Atualizar post
- ✅ **DELETE /posts/:id** - Deletar post
- ✅ **GET /posts/search** - Buscar posts
- ✅ Validações de entrada
- ✅ Códigos de status HTTP
- ✅ Estrutura de resposta JSON

### 4. Testes de Configuração
**Arquivo**: `tests/config.test.js`

Testa a configuração básica do ambiente de testes.

## 🛠️ Configuração

### Arquivos de Configuração

1. **`jest.config.js`** - Configuração principal do Jest
2. **`tests/setup.js`** - Configuração global dos testes
3. **`tests/teardown.js`** - Limpeza após os testes
4. **`.env.test`** - Variáveis de ambiente para testes

### Helpers Utilitários

**`tests/helpers/database.js`**
- `clearDatabase()` - Limpa dados de teste
- `seedDatabase()` - Insere dados de teste
- `createTestPost()` - Cria post para teste
- `closeDatabase()` - Fecha conexões

## 🚀 Como Executar

### Executar todos os testes
```bash
npm test
```

### Executar com cobertura
```bash
npm run coverage
```

### Executar arquivo específico
```bash
npx jest tests/postModel.test.js
```

### Executar em modo watch
```bash
npx jest --watch
```

## 📦 Dependências de Teste

- **jest**: Framework de testes
- **supertest**: Testes de integração para APIs
- **dotenv**: Variáveis de ambiente

## 🔧 Pipeline CI/CD

Os testes estão integrados ao pipeline CI/CD no arquivo `.github/workflows/ci.yml`:

1. ✅ Configuração do banco PostgreSQL
2. ✅ Instalação das dependências
3. ✅ Execução das migrations
4. ✅ Execução dos testes automatizados
5. ✅ Geração do relatório de cobertura

## 📈 Relatório de Cobertura

O relatório de cobertura é gerado em:
- **Terminal**: Resumo visual
- **HTML**: `coverage/lcov-report/index.html`
- **LCOV**: `coverage/lcov.info`

## 🎯 Cenários Testados

### Casos de Sucesso
- ✅ CRUD completo de posts
- ✅ Busca e filtros
- ✅ Respostas JSON corretas
- ✅ Códigos HTTP apropriados

### Casos de Erro
- ✅ Validação de campos obrigatórios
- ✅ Validação de formatos
- ✅ IDs inválidos
- ✅ Recursos não encontrados
- ✅ JSON mal formado

### Casos Extremos
- ✅ Lista vazia
- ✅ Termos de busca muito curtos
- ✅ Campos com tamanhos mínimos

## 📝 Próximos Passos

Para melhorar ainda mais a cobertura de testes:

1. **Testes de Middleware**: Ampliar cobertura do errorHandler
2. **Testes E2E**: Implementar testes end-to-end
3. **Testes de Performance**: Adicionar testes de carga
4. **Testes de Segurança**: Validações de segurança

## 🏆 Qualidade dos Testes

- **✅ Isolamento**: Cada teste é independente
- **✅ Cleanup**: Banco limpo entre testes
- **✅ Mocks**: Controllers usam mocks apropriados
- **✅ Assertions**: Validações completas de resposta
- **✅ Descritivo**: Nomes de teste claros e objetivos
