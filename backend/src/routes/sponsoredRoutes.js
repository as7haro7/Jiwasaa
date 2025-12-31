
import express from "express";
import {
    getActiveSponsored,
    createSponsored,
    getSponsoredById,
    updateSponsored,
    deleteSponsored,
} from "../controllers/sponsoredController.js";
// import { protect, admin } from "../middlewares/authMiddleware.js"; // Uncomment when auth is ready

const router = express.Router();

// Public: Get active sponsored locations

/**
 * @swagger
 * tags:
 *   name: Sponsored
 *   description: Sponsored placements management
 */

/**
 * @swagger
 * /sponsored:
 *   get:
 *     summary: Get active sponsored placements
 *     tags: [Sponsored]
 *     responses:
 *       200:
 *         description: List of active sponsored placements
 *   post:
 *     summary: Create a sponsored placement (Admin)
 *     tags: [Sponsored]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SponsoredPlacement'
 *     responses:
 *       201:
 *         description: Created
 */
router.get("/", getActiveSponsored);
router.post("/", createSponsored);

/**
 * @swagger
 * /sponsored/{id}:
 *   get:
 *     summary: Get sponsored placement by ID
 *     tags: [Sponsored]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details
 *   put:
 *     summary: Update sponsored placement
 *     tags: [Sponsored]
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
 *             $ref: '#/components/schemas/SponsoredPlacement'
 *     responses:
 *       200:
 *         description: Updated
 *   delete:
 *     summary: Delete sponsored placement
 *     tags: [Sponsored]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 */
router.get("/:id", getSponsoredById);
router.put("/:id", updateSponsored);
router.delete("/:id", deleteSponsored);

export default router;
