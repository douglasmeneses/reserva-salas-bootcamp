//IMPORTS
require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");

// COMEÇA A APP
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

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}...`);
});
