const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pet Project API',
      version: '1.0.0',
      description: 'API for managing pets and owners with authentication',
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Local server' }
    ],
  },
  apis: ['./routes/*.js'], 
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
