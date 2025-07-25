import pool from "../config/db.js";

const findAllRooms = async (capacity) => {
  let query = "SELECT * FROM salas";
  const params = [];
  if (capacity) {
    query += " WHERE capacidade >= $1";
    params.push(capacity);
  }
  const result = await pool.query(query, params);
  return result.rows;
};

const findRoomById = async (roomId) => {
  const result = await pool.query("SELECT * FROM salas WHERE id = $1", [
    roomId,
  ]);
  return result.rows[0];
};

const getRoomSchedules = async (roomId) => {
  const result = await pool.query(
    "SELECT id, inicio, fim FROM horarios WHERE sala_id = $1 ORDER BY inicio",
    [roomId]
  );
  return result.rows;
};

const getAvailableSchedulesForRoom = async (roomId, date) => {
  const result = await pool.query(
    `
        SELECT h.id AS horario_id,
               h.inicio,
               h.fim
        FROM horarios h
        WHERE h.sala_id = $1
          AND NOT EXISTS (
            SELECT 1
            FROM reservas r
            WHERE r.horario_id = h.id
              AND r.data = $2
          )
        ORDER BY h.inicio;
    `,
    [roomId, date]
  );
  return result.rows;
};

const getScheduleById = async (scheduleId) => {
  const result = await pool.query("SELECT * FROM horarios WHERE id = $1", [
    scheduleId,
  ]);
  return result.rows[0];
};

export default {
  findAllRooms,
  findRoomById,
  getRoomSchedules,
  getAvailableSchedulesForRoom,
  getScheduleById,
};
