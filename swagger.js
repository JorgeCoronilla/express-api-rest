import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

//Metadata info

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Rest Express',
      version: '1.0.0',
      description: 'A simple Express API rest',
    },
    servers: [
      {
        url: 'http://localhost:3000/v1',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

//Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app, port) => {
  app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/v1/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  console.log(`Swagger docs available at http://localhost:${port}/v1/api-docs`);
};
