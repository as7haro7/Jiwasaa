
import mongoose from "mongoose";

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
    },
    {
        timestamps: true,
    }
);

const Dish = mongoose.model("Dish", dishSchema);

export default Dish;
