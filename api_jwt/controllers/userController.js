// controllers/userController.js
const userService = require("../services/userService");

const getUserProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserProfile(req.user.id);
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
    if (parseInt(req.params.id) !== req.user.id) {
      const error = new Error(
        "Você não tem permissão para visualizar as reservas de outro usuário."
      );
      error.statusCode = 403;
      error.status = "fail";
      return next(error);
    }
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
    if (parseInt(req.params.id) !== req.user.id) {
      const error = new Error(
        "Você não pode criar reservas para outro usuário."
      );
      error.statusCode = 403;
      error.status = "fail";
      return next(error);
    }
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
    await userService.cancelReservation(req.user.id, req.params.reservationId);
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
      req.user.id,
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

module.exports = {
  getUserProfile,
  getUserReservations,
  createReservation,
  deleteReservation,
  updateReservation,
};
