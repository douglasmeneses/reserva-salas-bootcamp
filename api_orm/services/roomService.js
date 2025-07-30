// services/roomService.js
const db = require("../models"); // Importa todos os modelos Sequelize
const { Op } = require("sequelize"); // Para operadores de consulta

const getAllRooms = async (capacity) => {
  let queryOptions = {};
  if (capacity) {
    queryOptions.where = {
      capacidade: {
        [Op.gte]: capacity,
      },
    };
  }
  const rooms = await db.Room.findAll(queryOptions);
  return rooms;
};

const getRoomDetails = async (roomId) => {
  const room = await db.Room.findByPk(roomId);
  if (!room) {
    const error = new Error("Sala não encontrada.");
    error.statusCode = 404;
    error.status = "fail";
    throw error;
  }
  return room;
};

const getRoomSchedules = async (roomId) => {
  const schedules = await db.Schedule.findAll({
    where: { salaId: roomId }, // salaId é o nome da FK
    attributes: ["id", "inicio", "fim"],
    order: [["inicio", "ASC"]],
  });
  if (schedules.length === 0) {
    const error = new Error("Nenhum horário configurado para esta sala.");
    error.statusCode = 404;
    error.status = "fail";
    throw error;
  }
  return schedules;
};

const getRoomAvailability = async (roomId, date) => {
  const room = await db.Room.findByPk(roomId);
  if (!room) {
    const error = new Error("Sala não encontrada.");
    error.statusCode = 404;
    error.status = "fail";
    throw error;
  }

  // Encontra todos os horários para a sala
  const allSchedules = await db.Schedule.findAll({
    where: { salaId: roomId },
    attributes: ["id", "inicio", "fim"],
  });

  // Encontra os horários já reservados para esta sala e data
  const reservedSchedules = await db.Reservation.findAll({
    where: {
      salaId: roomId,
      data: date,
    },
    attributes: ["horarioId"],
  });

  const reservedHorarioIds = new Set(
    reservedSchedules.map((res) => res.horarioId)
  );

  // Filtra os horários disponíveis
  const availableSchedules = allSchedules.filter(
    (schedule) => !reservedHorarioIds.has(schedule.id)
  );

  return availableSchedules.map((schedule) => ({
    horario_id: schedule.id,
    inicio: schedule.inicio,
    fim: schedule.fim,
  }));
};

module.exports = {
  getAllRooms,
  getRoomDetails,
  getRoomSchedules,
  getRoomAvailability,
};
