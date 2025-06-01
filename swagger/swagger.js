const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API',
      version: '1.0.0',
      description: 'API RESTful para gerenciamento de postagens de blog',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], // Arquivos onde estão as anotações Swagger
};

const specs = swaggerJsDoc(options);

module.exports = { swaggerUi, specs };