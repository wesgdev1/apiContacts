const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Contactos",
      version: "1.0.0",
      description: "Una API para administrar contactos",
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Servidor de desarrollo",
      },
    ],
  },
  apis: ["./index.js"], // Ruta a los archivos de ruta donde están definidas las rutas
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
