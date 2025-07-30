// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/jwt");
const pool = require("../config/db");

// Funções middleware não precisam de try-catch se usarem `next(error)` para passar para o manipulador global
// No entanto, para consistência com a remoção de catchAsync, os erros aqui serão passados com next(error) explicitamente.
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
      return next(err); // Outros erros de JWT para o manipulador global
    }

    const userResult = await pool.query(
      "SELECT id, nome, email FROM usuarios WHERE id = $1",
      [decoded.id]
    );

    if (userResult.rows.length === 0) {
      const error = new Error(
        "O usuário pertencente a este token não existe mais."
      );
      error.statusCode = 401;
      error.status = "fail";
      return next(error);
    }

    req.user = userResult.rows[0];
    next();
  } catch (err) {
    next(err); // Captura qualquer erro inesperado no middleware e passa para o manipulador global
  }
};

const restrictTo = (req, res, next) => {
  // Esta função não é assíncrona, então não precisa de try-catch
  if (!req.user || !roles.includes(req.user.role)) {
    const error = new Error("Você não tem permissão para realizar esta ação.");
    error.statusCode = 403;
    error.status = "fail";
    return next(error);
  }
  next();
};

module.exports = {
  protect,
  restrictTo,
};
