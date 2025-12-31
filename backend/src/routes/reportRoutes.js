
import express from "express";
import { createReport, getReports, updateReportStatus } from "../controllers/reportController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Problem reporting
 */

/**
 * @swagger
 * /reportes:
 *   post:
 *     summary: Create a report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tipo
 *               - descripcion
 *             properties:
 *               lugarId:
 *                 type: string
 *               tipo:
 *                 type: string
 *                 enum: [dato_incorrecto, lugar_cerrado, duplicado, inapropiado, otro]
 *               descripcion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Report created
 *   get:
 *     summary: Get all reports (Admin)
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of reports
 */
router.route("/")
    .post(protect, createReport)
    .get(protect, admin, getReports);

/**
 * @swagger
 * /reportes/{id}:
 *   put:
 *     summary: Update report status (Admin)
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [pendiente, revisado, resuelto, descartado]
 *     responses:
 *       200:
 *         description: Status updated
 */
router.route("/:id")
    .put(protect, admin, updateReportStatus);

export default router;
