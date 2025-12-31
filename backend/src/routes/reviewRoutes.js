
import express from "express";
import { getReviews, createReview, markReviewHelpful } from "../controllers/reviewController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router({ mergeParams: true });


/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Review management
 */

/**
 * @swagger
 * /lugares/{lugarId}/resenas:
 *   get:
 *     summary: Get reviews for a place
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: lugarId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of reviews
 *   post:
 *     summary: Create a review (Auth required)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: lugarId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *               - comentario
 *             properties:
 *               rating:
 *                 type: number
 *               comentario:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review created
 */
router.route("/")
    .get(getReviews)
    .post(protect, createReview);

/**
 * @swagger
 * /resenas/{id}/util:
 *   post:
 *     summary: Mark review as helpful
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Marked as helpful
 */
router.route("/:id/util")
    .post(protect, markReviewHelpful);

export default router;
