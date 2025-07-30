// config/swagger.js
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Reserva de Salas",
      version: "1.0.0",
      description:
        "Documentação da API para um sistema de reserva de salas de estudo/reunião.",
      contact: {
        name: "Seu Nome/Empresa",
        url: "https://seusite.com",
        email: "contato@seusite.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Servidor de Desenvolvimento",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Autenticação JWT (token de acesso)",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // ATENÇÃO: Verifique os caminhos para suas anotações JSDoc
  apis: [
    "./routes/*.js", // Se suas anotações estiverem nos arquivos de rota
    "./controllers/*.js", // Se suas anotações estiverem nos arquivos de controlador
    "./models/*.js", // Opcional: Se você tiver schemas de modelo definidos com JSDoc aqui
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
