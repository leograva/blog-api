const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const postsRoutes = require('./routes/postsRoutes');
const studentsRoutes = require('./routes/studentsRoutes');
const teachersRoutes = require('./routes/teachersRoutes');
const { swaggerUi, specs } = require('./swagger/swagger');
const { globalErrorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();

const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Middleware para capturar erros de JSON mal formado
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      status: 'error',
      message: 'JSON mal formado',
      details: {
        error: 'Verifique a sintaxe do JSON enviado'
      }
    });
  }
  next(err);
});

// Rotas
app.use('/posts', postsRoutes);
app.use('/students', studentsRoutes);
app.use('/teachers', teachersRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Middleware para rotas não encontradas (deve vir depois de todas as rotas)
app.use(notFoundHandler);

// Middleware global de tratamento de erros (deve ser o último)
app.use(globalErrorHandler);

// configurar middlewares e rotas
module.exports = app;

// Inicia o servidor se este arquivo for executado diretamente
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}