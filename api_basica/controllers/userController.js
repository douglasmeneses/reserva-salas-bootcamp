import userService from "../services/userService.js";

const register = async (req, res, next) => {
  try {
    const { nome, email, senha } = req.body;
    const { user } = await userService.registerUser(nome, email, senha);

    res.status(201).json({
      status: "success",
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
    const { user } = await userService.loginUser(email, senha);

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserProfile(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getUserReservations = async (req, res, next) => {
  try {
    const reservations = await userService.getUserReservations(req.params.id);
    res.status(200).json({
      status: "success",
      results: reservations.length,
      data: {
        reservations,
      },
    });
  } catch (err) {
    next(err);
  }
};

const createReservation = async (req, res, next) => {
  try {
    const { sala_id, horario_id, data } = req.body;
    const newReservation = await userService.makeReservation(
      req.params.id,
      sala_id,
      horario_id,
      data
    );
    res.status(201).json({
      status: "success",
      data: {
        reservation: newReservation,
      },
    });
  } catch (err) {
    next(err);
  }
};

const deleteReservation = async (req, res, next) => {
  try {
    await userService.cancelReservation(
      req.params.id,
      req.params.reservationId
    );
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

const updateReservation = async (req, res, next) => {
  try {
    const { horario_id } = req.body;
    const updatedReservation = await userService.updateUserReservation(
      req.params.id,
      req.params.reservationId,
      horario_id
    );
    res.status(200).json({
      status: "success",
      data: {
        reservation: updatedReservation,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default {
  register,
  login,
  getUserProfile,
  getUserReservations,
  createReservation,
  deleteReservation,
  updateReservation,
};
