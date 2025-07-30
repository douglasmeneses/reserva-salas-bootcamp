// services/userService.js
const db = require("../models"); // Importa todos os modelos Sequelize
const { Op } = require("sequelize"); // Para operadores de consulta

const getUserProfile = async (userId) => {
  const user = await db.User.findByPk(userId, {
    attributes: ["id", "nome", "email", "created_at", "updated_at"],
  });
  if (!user) {
    const error = new Error("Usuário não encontrado.");
    error.statusCode = 404;
    error.status = "fail";
    throw error;
  }
  return user;
};

const getUserReservations = async (userId) => {
  const reservations = await db.Reservation.findAll({
    where: { usuarioId: userId },
    include: [
      { model: db.Room, as: "sala", attributes: ["id", "nome"] },
      {
        model: db.Schedule,
        as: "horario",
        attributes: ["id", "inicio", "fim"],
      },
    ],
    order: [
      ["data", "ASC"],
      [{ model: db.Schedule, as: "horario" }, "inicio", "ASC"],
    ],
  });

  // Mapeia para o formato de saída esperado anteriormente, ajustando nomes de campo
  return reservations.map((res) => ({
    reserva_id: res.id,
    sala: res.sala.nome,
    sala_id: res.sala.id,
    data: res.data,
    inicio: res.horario.inicio,
    fim: res.horario.fim,
    horario_id: res.horario.id,
    created_at: res.createdAt,
  }));
};

const makeReservation = async (userId, roomId, horarioId, date) => {
  const room = await db.Room.findByPk(roomId);
  if (!room) {
    const error = new Error("Sala não encontrada.");
    error.statusCode = 404;
    error.status = "fail";
    throw error;
  }

  const schedule = await db.Schedule.findByPk(horarioId);
  if (!schedule || schedule.salaId !== roomId) {
    // schedule.salaId é o nome da FK gerado pelo Sequelize
    const error = new Error("Horário inválido para esta sala.");
    error.statusCode = 400;
    error.status = "fail";
    throw error;
  }

  const isReserved = await db.Reservation.findOne({
    where: {
      salaId: roomId,
      horarioId: horarioId,
      data: date,
    },
  });
  if (isReserved) {
    const error = new Error(
      "Este horário já está reservado para esta sala e data."
    );
    error.statusCode = 409;
    error.status = "fail";
    throw error;
  }

  const newReservation = await db.Reservation.create({
    usuarioId: userId, // Sequelize usa camelCase para FKs por padrão, se underscored=false
    salaId: roomId, // se underscored=true (como configuramos), ainda é sala_id no DB,
    horarioId: horarioId, // mas é acessado como horarioId no Sequelize model instance
    data: date,
  });
  return newReservation;
};

const cancelReservation = async (userId, reservationId) => {
  const deletedCount = await db.Reservation.destroy({
    where: {
      id: reservationId,
      usuarioId: userId,
    },
  });
  if (deletedCount === 0) {
    const error = new Error(
      "Reserva não encontrada ou você não tem permissão para cancelá-la."
    );
    error.statusCode = 404;
    error.status = "fail";
    throw error;
  }
  // Retorna true ou o número de linhas afetadas para indicar sucesso
  return { message: "Reserva cancelada com sucesso." };
};

const updateUserReservation = async (userId, reservationId, newHorarioId) => {
  const existingReservation = await db.Reservation.findOne({
    where: { id: reservationId, usuarioId: userId },
    include: [{ model: db.Room, as: "sala", attributes: ["id"] }], // Inclui sala_id para validação
  });

  if (!existingReservation) {
    const error = new Error(
      "Reserva não encontrada ou você não tem permissão para atualizá-la."
    );
    error.statusCode = 404;
    error.status = "fail";
    throw error;
  }

  const newSchedule = await db.Schedule.findByPk(newHorarioId);
  if (!newSchedule || newSchedule.salaId !== existingReservation.sala.id) {
    const error = new Error("Novo horário inválido para esta sala.");
    error.statusCode = 400;
    error.status = "fail";
    throw error;
  }

  // Verifica se o novo horário já está reservado para a mesma sala e data,
  // exceto se for a própria reserva que está sendo atualizada (mudando para o mesmo horário)
  const isAlreadyReserved = await db.Reservation.findOne({
    where: {
      salaId: existingReservation.sala.id,
      horarioId: newHorarioId,
      data: existingReservation.data,
      id: { [Op.ne]: reservationId }, // Exclui a própria reserva
    },
  });

  if (isAlreadyReserved) {
    const error = new Error(
      "O novo horário selecionado já está reservado para esta sala e data."
    );
    error.statusCode = 409;
    error.status = "fail";
    throw error;
  }

  existingReservation.horarioId = newHorarioId;
  await existingReservation.save(); // Salva as alterações

  return existingReservation;
};

module.exports = {
  getUserProfile,
  getUserReservations,
  makeReservation,
  cancelReservation,
  updateUserReservation,
};
