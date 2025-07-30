require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

// --- Importa a instância Sequelize configurada ---
const sequelize = require("./config/db");
// --- Importa os modelos e associações do Sequelize ---
const db = require("./models");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/usuarios", userRoutes);
app.use("/api/salas", roomRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.API_PORT || 3000;
// Sincroniza os modelos com o banco de dados e só então inicia o servidor
db.sequelize
  .sync()
  .then(() => {
    console.log("Modelos Sequelize sincronizados com o banco de dados.");
    const server = app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}...`);
      console.log(`Ambiente: ${process.env.NODE_ENV || "development"}`);
    });

    // --- 7. Tratamento de Erros de Processo ---
    process.on("unhandledRejection", (err) => {
      console.log("UNHANDLED REJECTION! 💥 Encerrando...");
      console.log(err.name, err.message, err.stack);
      server.close(() => {
        process.exit(1);
      });
    });

    process.on("uncaughtException", (err) => {
      console.log("UNCAUGHT EXCEPTION! 💥 Encerrando...");
      console.log(err.name, err.message, err.stack);
      process.exit(1);
    });
  })
  .catch((err) => {
    console.error(
      "Falha na sincronização dos modelos Sequelize com o DB:",
      err
    );
    process.exit(1);
  });
