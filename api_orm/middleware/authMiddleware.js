// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/jwt");
const { User } = require("../models");

const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      const error = new Error(
        "Você não está logado! Por favor, faça o login para ter acesso."
      );
      error.statusCode = 401;
      error.status = "fail";
      return next(error);
    }

    let decoded;
    try {
      decoded = jwt.verify(token, jwtSecret);
    } catch (err) {
      if (err.name === "JsonWebTokenError") {
        const error = new Error(
          "Token inválido. Por favor, faça login novamente!"
        );
        error.statusCode = 401;
        error.status = "fail";
        return next(error);
      }
      if (err.name === "TokenExpiredError") {
        const error = new Error(
          "Seu token expirou! Por favor, faça login novamente."
        );
        error.statusCode = 401;
        error.status = "fail";
        return next(error);
      }
      return next(err);
    }

    const user = await User.findByPk(decoded.id, {
      attributes: ["id", "nome", "email"],
    });

    if (!user) {
      const error = new Error(
        "O usuário pertencente a este token não existe mais."
      );
      error.statusCode = 401;
      error.status = "fail";
      return next(error);
    }

    // Converter para objeto simples se necessário
    req.user = user.toJSON();
    next();
  } catch (err) {
    next(err);
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      const error = new Error(
        "Você não tem permissão para realizar esta ação."
      );
      error.statusCode = 403;
      error.status = "fail";
      return next(error);
    }
    next();
  };
};

module.exports = {
  protect,
  restrictTo,
};
