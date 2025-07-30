// controllers/roomController.js
const roomService = require("../services/roomService");

const getAllRooms = async (req, res, next) => {
  try {
    const { capacidade } = req.query;
    const rooms = await roomService.getAllRooms(capacidade);
    res.status(200).json({
      status: "success",
      results: rooms.length,
      data: {
        rooms,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getRoomById = async (req, res, next) => {
  try {
    const room = await roomService.getRoomDetails(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        room,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getRoomSchedules = async (req, res, next) => {
  try {
    const schedules = await roomService.getRoomSchedules(req.params.id);
    res.status(200).json({
      status: "success",
      results: schedules.length,
      data: {
        schedules,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getRoomAvailability = async (req, res, next) => {
  try {
    const { data } = req.query;
    if (!data) {
      const error = new Error(
        "A data é obrigatória para verificar a disponibilidade."
      );
      error.statusCode = 400;
      error.status = "fail";
      return next(error);
    }
    const availableSchedules = await roomService.getRoomAvailability(
      req.params.id,
      data
    );
    res.status(200).json({
      status: "success",
      results: availableSchedules.length,
      data: {
        availableSchedules,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllRooms,
  getRoomById,
  getRoomSchedules,
  getRoomAvailability,
};
