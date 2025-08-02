# Sistema de Tratamento de Erros - Blog API

## 📋 Visão Geral

A API agora possui um sistema robusto de tratamento de erros que fornece informações detalhadas sobre problemas encontrados, facilitando o debugging e melhorando a experiência do desenvolvedor.

## 🔧 Componentes

### 1. ErrorHandler Middleware
- **Localização**: `middleware/errorHandler.js`
- **Funcionalidades**:
  - Classe `AppError` para erros customizados
  - Tratamento específico para erros PostgreSQL
  - Logs detalhados para debugging
  - Respostas padronizadas

### 2. Tipos de Resposta de Erro

#### Estrutura Padrão
```json
{
  "status": "error",
  "message": "Descrição do erro",
  "timestamp": "2025-08-02T03:39:41.731Z",
  "path": "/posts",
  "method": "GET",
  "details": {
    "missingFields": ["title", "content"],
    "error_code": "23505"
  }
}
```

## 📊 Códigos de Status HTTP

### 400 - Bad Request
- Campos obrigatórios não informados
- Dados inválidos (ID não numérico)
- Validações falham (título muito curto, etc.)

### 404 - Not Found
- Post não encontrado
- Rota inexistente

### 409 - Conflict
- Violação de constraint única no banco

### 500 - Internal Server Error
- Erros de conexão com banco
- Erros não tratados

### 503 - Service Unavailable
- Banco de dados indisponível

## 🎯 Exemplos de Uso

### Erro de Validação
```bash
POST /posts
Body: {}

Resposta:
{
  "status": "error",
  "message": "Campos obrigatórios não informados",
  "details": {
    "missingFields": ["title", "content", "author"]
  }
}
```

### Post Não Encontrado
```bash
GET /posts/999

Resposta:
{
  "status": "error",
  "message": "Post não encontrado",
  "details": {
    "postId": "999"
  }
}
```

### Rota Inexistente
```bash
GET /rota-inexistente

Resposta:
{
  "status": "error",
  "message": "Rota /rota-inexistente não encontrada"
}
```

## 🔍 Logs para Debugging

O sistema gera logs detalhados no console:

```
=== ERRO CAPTURADO ===
Timestamp: 2025-08-02T03:39:41.731Z
Method: POST
URL: /posts
Headers: {...}
Body: {...}
Error: {
  message: "Campos obrigatórios não informados",
  stack: "...",
  code: null
}
=== FIM DO ERRO ===
```

## 🚀 Benefícios

1. **Debugging Facilitado**: Logs detalhados com contexto completo
2. **Respostas Consistentes**: Formato padronizado de erro
3. **Informações Específicas**: Detalhes sobre campos faltantes, IDs inválidos, etc.
4. **Códigos HTTP Apropriados**: Status codes semânticos corretos
5. **Tratamento de Banco**: Erros PostgreSQL traduzidos para mensagens amigáveis

## 📝 Configuração de Ambiente

- **Desenvolvimento**: Inclui stack trace e detalhes completos
- **Produção**: Remove informações sensíveis, mantém logs internos

## 🛠️ Customização

Para adicionar novos tipos de erro:

1. Use a classe `AppError` nos controladores
2. Adicione tratamentos específicos no `globalErrorHandler`
3. Configure códigos de status apropriados
4. Inclua detalhes relevantes no objeto `details`
