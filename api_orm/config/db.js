// config/db.js
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: process.env.NODE_ENV === "development" ? console.log : false, // Log SQL no desenvolvimento
    define: {
      timestamps: true, // Adiciona createdAt e updatedAt automaticamente
      underscored: true, // Usa snake_case para nomes de colunas
    },
  }
);

// Testa a conexão
sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Conexão Sequelize com o banco de dados estabelecida com sucesso."
    );
  })
  .catch((err) => {
    console.error(
      "Não foi possível conectar ao banco de dados usando Sequelize:",
      err
    );
    process.exit(1); // Encerra a aplicação se a conexão falhar
  });

module.exports = sequelize;
