// routes/roomRoutes.js
const express = require("express");
const roomController = require("../controllers/roomController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware.protect); // All routes below this will be protected

router.get("/", roomController.getAllRooms); // /salas?data=2025-07-20&capacidade=50
router.get("/:id", roomController.getRoomById);
router.get("/:id/horarios", roomController.getRoomSchedules);
router.get("/:id/disponibilidade", roomController.getRoomAvailability); // /salas/:id/disponibilidade?data=2025-07-20

module.exports = router;

/**
 * @swagger
 * /salas:
 *   get:
 *     summary: Listar todas as salas - opcional capacidade
 *     tags:
 *       - Salas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: capacidade
 *         schema:
 *           type: integer
 *         description: Capacidade mínima da sala
 *     responses:
 *       200:
 *         description: Lista de salas
 *       401:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /salas/{id}:
 *   get:
 *     summary: Obter detalhes da sala
 *     tags:
 *       - Salas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes da sala
 *       401:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /salas/{id}/horarios:
 *   get:
 *     summary: Listar horários da sala
 *     tags:
 *       - Salas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de horários
 *       401:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /salas/{id}/disponibilidade:
 *   get:
 *     summary: Verificar disponibilidade da sala para uma data
 *     tags:
 *       - Salas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: data
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Data para verificar disponibilidade
 *     responses:
 *       200:
 *         description: Horários disponíveis
 *       401:
 *         description: Não autorizado
 */
