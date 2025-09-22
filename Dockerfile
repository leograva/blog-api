# Usa imagem base do Node.js (bom!)
FROM node:18

# Define diretório de trabalho (correto)
WORKDIR /usr/src/app

# Copia arquivos de dependência (boa prática)
COPY package*.json ./

# Instala dependências (ok, mas pode ser mais seguro)
RUN npm install

# Copia o restante do código
COPY . .

# Copia scripts de inicialização
COPY ./initdb/init.sql /initdb/init.sql
COPY ./initdb/run-init.sh /initdb/run-init.sh
# Torna o script executável
RUN chmod +x /initdb/run-init.sh

# Expõe a porta 3000
EXPOSE 3000

# Comando para iniciar o app
CMD ["npm", "start"]