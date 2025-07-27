// models/userModel.js
const pool = require("../config/db");

const createUser = async (name, email, passwordHash) => {
  const result = await pool.query(
    "INSERT INTO usuarios (nome, email, senha_hash) VALUES ($1, $2, $3) RETURNING id, nome, email, created_at, updated_at",
    [name, email, passwordHash]
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

const findUserById = async (id) => {
  const result = await pool.query(
    "SELECT id, nome, email, created_at, updated_at FROM usuarios WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

const getUserReservations = async (userId) => {
  const result = await pool.query(
    `
        SELECT
            r.id AS reserva_id,
            s.nome AS sala,
            s.id AS sala_id,
            r.data,
            h.id AS horario_id,
            h.inicio,
            h.fim,
            r.created_at
        FROM reservas r
        JOIN salas s ON s.id = r.sala_id
        JOIN horarios h ON h.id = r.horario_id
        WHERE r.usuario_id = $1
        ORDER BY r.data ASC, h.inicio;
    `,
    [userId]
  );
  return result.rows;
};

const createReservation = async (userId, roomId, scheduleId, date) => {
  const result = await pool.query(
    "INSERT INTO reservas (usuario_id, sala_id, horario_id, data) VALUES ($1, $2, $3, $4) RETURNING id, usuario_id, sala_id, horario_id, data, created_at, updated_at",
    [userId, roomId, scheduleId, date]
  );
  return result.rows[0];
};

const deleteReservation = async (userId, reservationId) => {
  const result = await pool.query(
    "DELETE FROM reservas WHERE id = $1 AND usuario_id = $2 RETURNING *",
    [reservationId, userId]
  );
  return result.rows[0];
};

const updateReservation = async (userId, reservationId, newScheduleId) => {
  const result = await pool.query(
    "UPDATE reservas SET horario_id = $1, updated_at = NOW() WHERE id = $2 AND usuario_id = $3 RETURNING *",
    [newScheduleId, reservationId, userId]
  );
  return result.rows[0];
};

const checkReservationExists = async (roomId, horarioId, date) => {
  const result = await pool.query(
    "SELECT id FROM reservas WHERE sala_id = $1 AND horario_id = $2 AND data = $3",
    [roomId, horarioId, date]
  );
  return result.rows.length > 0;
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  getUserReservations,
  createReservation,
  deleteReservation,
  updateReservation,
  checkReservationExists,
};
