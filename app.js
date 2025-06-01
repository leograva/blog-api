const express = require('express');
const bodyParser = require('body-parser');
const postsRoutes = require('./routes/postsRoutes');
const { swaggerUi, specs } = require('./swagger/swagger');

const app = express();

const PORT = 3000;


app.use(bodyParser.json());
app.use('/posts', postsRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// configurar middlewares e rotas
module.exports = app;

// Inicia o servidor se este arquivo for executado diretamente
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}