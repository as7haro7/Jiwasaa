
import express from "express";
import { getFavorites, addFavorite, removeFavoriteByPlace } from "../controllers/favoriteController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: User favorites
 */

/**
 * @swagger
 * /favoritos:
 *   get:
 *     summary: Get my favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of favorites
 *   post:
 *     summary: Add place to favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lugarId
 *             properties:
 *               lugarId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Added to favorites
 */
router.route("/")
    .get(protect, getFavorites)
    .post(protect, addFavorite);

/**
 * @swagger
 * /favoritos/lugar/{lugarId}:
 *   delete:
 *     summary: Remove place from favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: lugarId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Removed from favorites
 */
router.route("/lugar/:lugarId")
    .delete(protect, removeFavoriteByPlace);

export default router;
