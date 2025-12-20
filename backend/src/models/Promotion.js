
import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema(
    {
        lugarId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Place",
            required: true,
        },
        platoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Dish",
        },
        titulo: {
            type: String,
            required: true,
        },
        descripcion: {
            type: String,
            required: true,
        },
        precioPromo: {
            type: Number,
        },
        descuentoPorcentaje: {
            type: Number,
        },
        fechaInicio: {
            type: Date,
            required: true,
        },
        fechaFin: {
            type: Date,
            required: true,
        },
        activa: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Promotion = mongoose.model("Promotion", promotionSchema);

export default Promotion;
