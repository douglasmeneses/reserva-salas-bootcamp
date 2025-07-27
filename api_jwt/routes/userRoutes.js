// routes/userRoutes.js
const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController"); // Import authController for registration
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Endpoints de usuários e reservas
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Registrar novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       409:
 *         description: Email já está em uso
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obter perfil do usuário
 *     tags: [Usuários]
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
 *         description: Perfil do usuário
 *       401:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /usuarios/{id}/reservas:
 *   get:
 *     summary: Listar reservas do usuário
 *     tags: [Usuários]
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
 *         description: Lista de reservas
 *       401:
 *         description: Não autorizado
 *   post:
 *     summary: Criar nova reserva para o usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sala_id:
 *                 type: integer
 *               horario_id:
 *                 type: integer
 *               data:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Reserva criada
 *       401:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /usuarios/{id}/reservas/{reservationId}:
 *   delete:
 *     summary: Cancelar reserva do usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: reservationId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Reserva cancelada
 *       401:
 *         description: Não autorizado
 *   put:
 *     summary: Atualizar horário da reserva do usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: reservationId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               horario_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Reserva atualizada
 *       401:
 *         description: Não autorizado
 */

// User registration
router.post("/", authController.register); // This is where /usuarios [POST] for registration should go

router.use(authMiddleware.protect); // All routes below this will be protected

// User specific routes
router.get("/:id", userController.getUserProfile); // To get user's own profile
router.get("/:id/reservas", userController.getUserReservations);
router.post("/:id/reservas", userController.createReservation);
router.delete("/:id/reservas/:reservationId", userController.deleteReservation);
router.put("/:id/reservas/:reservationId", userController.updateReservation);

module.exports = router;
