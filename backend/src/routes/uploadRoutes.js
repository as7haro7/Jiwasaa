import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import path from "path";

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Uploads
 *   description: File uploads
 */

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload an image
 *     tags: [Uploads]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imageUrl:
 *                   type: string
 *                 message:
 *                   type: string
 */
router.post("/", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: "No se subió ningún archivo" });
    }
    // Return the path relative to the server
    // Assuming we serve 'uploads' folder dynamically
    res.send({
        imageUrl: `uploads/${req.file.filename}`,
        message: "Imagen subida exitosamente",
    });
});

export default router;
