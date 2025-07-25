import roomModel from "../models/roomModel.js";

const getAllRooms = async (capacity) => {
  const rooms = await roomModel.findAllRooms(capacity);
  return rooms;
};

const getRoomDetails = async (roomId) => {
  const room = await roomModel.findRoomById(roomId);
  if (!room) {
    const error = new Error("Sala não encontrada.");
    error.statusCode = 404;
    error.status = "fail";
    throw error;
  }
  return room;
};

const getRoomSchedules = async (roomId) => {
  const schedules = await roomModel.getRoomSchedules(roomId);
  if (schedules.length === 0) {
    const error = new Error("Nenhum horário configurado para esta sala.");
    error.statusCode = 404;
    error.status = "fail";
    throw error;
  }
  return schedules;
};

const getRoomAvailability = async (roomId, date) => {
  const room = await roomModel.findRoomById(roomId);
  if (!room) {
    const error = new Error("Sala não encontrada.");
    error.statusCode = 404;
    error.status = "fail";
    throw error;
  }

  const availableSchedules = await roomModel.getAvailableSchedulesForRoom(
    roomId,
    date
  );
  return availableSchedules;
};

export default {
  getAllRooms,
  getRoomDetails,
  getRoomSchedules,
  getRoomAvailability,
};
