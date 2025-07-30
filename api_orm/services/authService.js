// services/authService.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models"); // Importa todos os modelos Sequelize
const { jwtSecret, jwtExpiresIn } = require("../config/jwt");

const signToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: jwtExpiresIn,
  });
};

const registerUser = async (name, email, password) => {
  const existingUser = await db.User.findOne({ where: { email } });
  if (existingUser) {
    const error = new Error("Este email já está em uso.");
    error.statusCode = 409;
    error.status = "fail";
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const newUser = await db.User.create({
    nome: name,
    email,
    senhaHash: passwordHash,
  });

  const token = signToken(newUser.id);
  return { user: newUser, token };
};

const loginUser = async (email, password) => {
  const user = await db.User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.senhaHash))) {
    const error = new Error("Email ou senha incorretos.");
    error.statusCode = 401;
    error.status = "fail";
    throw error;
  }

  const token = signToken(user.id);
  return { user, token };
};

module.exports = {
  registerUser,
  loginUser,
};
