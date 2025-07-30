// controllers/authController.js
const authService = require("../services/authService");

const register = async (req, res, next) => {
  try {
    const { nome, email, senha } = req.body;
    const { user, token } = await authService.registerUser(nome, email, senha);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    next(err); // Passa o erro para o manipulador de erros global
  }
};

const login = async (req, res, next) => {
  try {
    const { email, senha } = req.body;
    const { user, token } = await authService.loginUser(email, senha);

    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
};
