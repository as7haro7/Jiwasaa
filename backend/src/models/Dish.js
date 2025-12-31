
import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Dish:
 *       type: object
 *       required:
 *         - lugarId
 *         - nombre
 *         - precio
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the dish
 *         lugarId:
 *           type: string
 *           description: The place ID this dish belongs to
 *         nombre:
 *           type: string
 *           description: Name of the dish
 *         descripcion:
 *           type: string
 *           description: Description of the dish
 *         precio:
 *           type: number
 *           description: Price in Bolivianos
 *         categoria:
 *           type: string
 *           description: Category (desayuno, almuerzo, etc)
 *         etiquetas:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags (picante, vegano, etc)
 *         disponible:
 *           type: boolean
 *           default: true
 *         destacado:
 *           type: boolean
 *           default: false
 *       example:
 *         nombre: Salteña de Carne
 *         precio: 8
 *         categoria: desayuno
 *         destacado: true
 */

const dishSchema = new mongoose.Schema(
    {
        lugarId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Place",
            required: true,
        },
        nombre: {
            type: String,
            required: true,
            trim: true,
        },
        descripcion: {
            type: String,
        },
        precio: {
            type: Number,
            required: true,
        },
        categoria: {
            type: String, // e.g., "desayuno", "almuerzo", "snack"
        },
        etiquetas: [
            {
                type: String, // e.g., "picante", "típico paceño", "vegano"
            },
        ],
        disponible: {
            type: Boolean,
            default: true,
        },
        destacado: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Dish = mongoose.model("Dish", dishSchema);

export default Dish;
