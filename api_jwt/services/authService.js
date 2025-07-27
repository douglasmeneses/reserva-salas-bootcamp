// services/authService.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const { jwtSecret, jwtExpiresIn } = require("../config/jwt");

const signToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: jwtExpiresIn,
  });
};

const registerUser = async (name, email, password) => {
  const existingUser = await userModel.findUserByEmail(email);
  if (existingUser) {
    const error = new Error("Este email já está em uso.");
    error.statusCode = 409;
    error.status = "fail";
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const newUser = await userModel.createUser(name, email, passwordHash);

  const token = signToken(newUser.id);
  return { user: newUser, token };
};

const loginUser = async (email, password) => {
  const user = await userModel.findUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.senha_hash))) {
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
