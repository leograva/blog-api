# Usa a imagem oficial do Node.js
FROM node:22

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos de dependências
COPY package*.json ./

# Garante que o NODE_ENV não esteja como "production"
ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

# Instala todas as dependências (inclusive devDependencies)
RUN npm install

# Copia o restante da aplicação
COPY . .

# Expõe a porta que a API usa
EXPOSE 3000

# Comando padrão para iniciar a aplicação
CMD ["npm", "start"]
