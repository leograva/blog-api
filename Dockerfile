# Usa a imagem oficial do Node.js
FROM node:22

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante da aplicação
COPY . .

# Expõe a porta que a API usa
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["sh", "-c", "npx sequelize-cli db:migrate && npm start"]
