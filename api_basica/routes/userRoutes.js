// routes/userRoutes.js
import { Router } from "express";
import userController from "../controllers/userController.js";

const router = Router();

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
 * /usuarios/login:
 *   post:
 *     summary: Fazer login
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário logado com sucesso
 *       409:
 *         description: Usuário não cadastrado
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obter perfil do usuário
 *     tags: [Usuários]
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

router.post("/", userController.register); // Usar userController para registro
router.post("/login", userController.login); // Login route
// User specific routes
router.get("/:id", userController.getUserProfile); // To get user's own profile
router.get("/:id/reservas", userController.getUserReservations);
router.post("/:id/reservas", userController.createReservation);
router.delete("/:id/reservas/:reservationId", userController.deleteReservation);
router.put("/:id/reservas/:reservationId", userController.updateReservation);

export default router;
