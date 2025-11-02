# 📝 Blog API

Uma API REST moderna para gerenciamento de blog construída com **Node.js**, **Express** e **PostgreSQL**.

---

## 🚀 Características

- ✅ CRUD completo de postagens via API REST
- 🐘 Integração com PostgreSQL
- 🐳 Containerização com Docker
- 📚 Documentação automática (Swagger/OpenAPI)
- 🧪 Testes automatizados (Jest)
- 🔄 CI/CD com GitHub Actions
- 🛡️ Middleware robusto de erros
- 📊 Validação de dados

---

## 🛠️ Tecnologias

| Camada         | Tecnologia                |
| -------------- | ------------------------ |
| **Backend**    | Node.js, Express.js      |
| **Banco**      | PostgreSQL               |
| **Container**  | Docker, Docker Compose   |
| **Docs**       | Swagger/OpenAPI          |
| **Testes**     | Jest                     |
| **CI/CD**      | GitHub Actions           |

---

## 📁 Estrutura de Arquivos

```text
blog-api/
├── app.js                  # Ponto de entrada
├── package.json            # Dependências e scripts
├── Dockerfile              # Build da imagem Docker
├── docker-compose.yml      # Orquestração dos containers
├── .gitignore              # Ignorados pelo Git
├── .env                    # Variáveis de ambiente
├── .env.test               # Variáveis para testes
├── jest.config.js          # Configuração do Jest
│
├── .github/
│   └── workflows/
│       └── ci.yml          # Pipeline CI
│
├── config/
│   └── db.js               # Conexão PostgreSQL
│
├── controllers/
│   └── postsController.js  # CRUD das postagens
│
├── docs/
│   └── error-handling.md   # Docs de erros
│
├── initdb/
│   └── init.sql            # Script SQL inicial
│
├── middleware/
│   └── errorHandler.js     # Middleware de erros
│
├── models/
│   └── postModel.js        # Modelo de Postagem
│
├── routes/
│   └── postsRoutes.js      # Rotas de postagens
│   └── studentsRoutes.js   # Rotas de estudantes
│   └── teachersRoutes.js   # Rotas de professores
│
├── swagger/
│   └── swagger.js          # Configuração Swagger
│
└── tests/
    ├── config.test.js
    ├── postModel.test.js
    ├── postsApi.test.js
    ├── postsController.test.js
    ├── setup.js
    ├── teardown.js
    └── helpers/
        └── database.js
```

---

## ⚡ Início Rápido

### 📋 Pré-requisitos

- Node.js 18+
- Docker & Docker Compose
- Git

### 🔧 Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/blog-api.git
   cd blog-api
   ```

2. **Configure as variáveis de ambiente**
   - O arquivo `.env` já existe, ajuste conforme necessário.

3. **Execute com Docker** (Recomendado)
   ```bash
   docker-compose up -d
   ```

### 🌐 Acesso

- **API:** http://localhost:3000
- **Swagger:** http://localhost:3000/api-docs
- **PostgreSQL:** `localhost:5432`

---

## 📖 Endpoints da API

### 📝 Postagens

| Método   | Endpoint             | Descrição                |
| -------- | -------------------- | ------------------------ |
| `GET`    | `/api/posts`         | Lista todas as postagens |
| `GET`    | `/api/posts/:id`     | Busca postagem por ID    |
| `POST`   | `/api/posts`         | Cria nova postagem       |
| `PUT`    | `/api/posts/:id`     | Atualiza postagem        |
| `DELETE` | `/api/posts/:id`     | Remove postagem          |

#### 📋 Exemplo de Payload

```json
{
  "title": "Minha Primeira Postagem",
  "content": "Conteúdo da postagem aqui...",
  "author": "João Silva"
}
```

---

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar testes com coverage
npm run test:coverage

```

#### 📊 Cobertura

- ✅ Configuração
- ✅ Modelo de dados
- ✅ Integração da API
- ✅ Controladores
- ✅ Helpers de banco

---

## 🐳 Docker

### 🏗️ Build da imagem

```bash
docker build -t blog-api .
```

### 🚀 Executar containers

```bash
docker-compose up -d      # Subir serviços
docker-compose logs -f api # Ver logs
docker-compose down        # Parar serviços
```

---

## 🔧 Scripts Disponíveis

```bash
npm start          # Produção
npm run dev        # Desenvolvimento (nodemon)
npm test           # Testes
npm run test:watch # Testes em modo watch
npm run lint       # Lint
npm run lint:fix   # Corrige lint
```

---

## 🌱 Variáveis de Ambiente

```bash
# Servidor
PORT=3000
NODE_ENV=development

# Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_NAME=blog_db
DB_USER=postgres
DB_PASSWORD=postgres

# Swagger
SWAGGER_HOST=localhost:3000
```

---

## 🌱 Desafios enfrentados
Durante o desenvolvimento deste projeto, diversos desafios técnicos e operacionais foram enfrentados e superados, contribuindo para o amadurecimento da solução e da equipe. Entre os principais pontos, destacam-se:

- **Tratamento e padronização de erros:** Inicialmente, as mensagens de erro retornadas pela API eram pouco informativas. Implementamos um middleware robusto para garantir respostas padronizadas e úteis, facilitando o consumo da API por aplicações clientes.
- **Configuração de ambiente e integração de serviços:** A integração entre Swagger, Docker e PostgreSQL exigiu ajustes finos em variáveis de ambiente, IPs e DNS.
- **Cobertura de testes e integração contínua:** A configuração do Jest e a integração com o GitHub Actions apresentaram desafios relacionados à cobertura de código e execução dos testes automatizados em ambientes CI/CD, demandando ajustes nos scripts e no pipeline.
- **Deploy em ambiente de produção:** O processo de implantação em uma VPS envolveu configuração de chaves SSH, permissões de acesso, setup de proxy reverso com Nginx e implementação de HTTPS via Certbot, garantindo segurança e disponibilidade.

Esses desafios foram superados por meio de pesquisa, colaboração entre os membros da equipe e aplicação de boas práticas de desenvolvimento de software.
