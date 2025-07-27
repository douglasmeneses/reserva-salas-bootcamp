// services/userService.js
const userModel = require("../models/userModel");
const roomModel = require("../models/roomModel");

const getUserProfile = async (userId) => {
  const user = await userModel.findUserById(userId);
  if (!user) {
    const error = new Error("Usuário não encontrado.");
    error.statusCode = 404;
    error.status = "fail";
    throw error;
  }
  return user;
};

const getUserReservations = async (userId) => {
  const reservations = await userModel.getUserReservations(userId);
  return reservations;
};

const makeReservation = async (userId, roomId, horarioId, date) => {
  const room = await roomModel.findRoomById(roomId);
  if (!room) {
    const error = new Error("Sala não encontrada.");
    error.statusCode = 404;
    error.status = "fail";
    throw error;
  }

  const schedule = await roomModel.getScheduleById(horarioId);
  if (!schedule || schedule.sala_id !== roomId) {
    const error = new Error("Horário inválido para esta sala.");
    error.statusCode = 400;
    error.status = "fail";
    throw error;
  }

  const isReserved = await userModel.checkReservationExists(
    roomId,
    horarioId,
    date
  );
  if (isReserved) {
    const error = new Error(
      "Este horário já está reservado para esta sala e data."
    );
    error.statusCode = 409;
    error.status = "fail";
    throw error;
  }

  const newReservation = await userModel.createReservation(
    userId,
    roomId,
    horarioId,
    date
  );
  return newReservation;
};

const cancelReservation = async (userId, reservationId) => {
  const deletedReservation = await userModel.deleteReservation(
    userId,
    reservationId
  );
  if (!deletedReservation) {
    const error = new Error(
      "Reserva não encontrada ou você não tem permissão para cancelá-la."
    );
    error.statusCode = 404;
    error.status = "fail";
    throw error;
  }
  return deletedReservation;
};

const updateUserReservation = async (userId, reservationId, newHorarioId) => {
  const existingReservations = await userModel.getUserReservations(userId);
  const existingReservation = existingReservations.find(
    (res) => res.reserva_id === parseInt(reservationId)
  );

  if (!existingReservation) {
    const error = new Error(
      "Reserva não encontrada ou você não tem permissão para atualizá-la."
    );
    error.statusCode = 404;
    error.status = "fail";
    throw error;
  }

  const newSchedule = await roomModel.getScheduleById(newHorarioId);
  if (!newSchedule || newSchedule.sala_id !== existingReservation.sala_id) {
    const error = new Error("Novo horário inválido para esta sala.");
    error.statusCode = 400;
    error.status = "fail";
    throw error;
  }

  const isAlreadyReserved = await userModel.checkReservationExists(
    existingReservation.sala_id,
    newHorarioId,
    existingReservation.data
  );
  if (isAlreadyReserved && existingReservation.horario_id !== newHorarioId) {
    const error = new Error(
      "O novo horário selecionado já está reservado para esta sala e data."
    );
    error.statusCode = 409;
    error.status = "fail";
    throw error;
  }

  const updatedReservation = await userModel.updateReservation(
    userId,
    reservationId,
    newHorarioId
  );
  if (!updatedReservation) {
    const error = new Error("Falha ao atualizar a reserva.");
    error.statusCode = 500;
    error.status = "error";
    throw error;
  }
  return updatedReservation;
};

module.exports = {
  getUserProfile,
  getUserReservations,
  makeReservation,
  cancelReservation,
  updateUserReservation,
};
