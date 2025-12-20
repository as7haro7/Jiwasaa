
import mongoose from "mongoose";

const placeSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true,
        },
        tipo: {
            type: String,
            enum: ["callejero", "mercado", "restaurante", "café", "otro"],
            required: true,
        },
        direccion: {
            type: String,
            required: true,
        },
        zona: {
            type: String,
            required: true,
            // Examples: "Centro", "Sopocachi", "Miraflores", etc.
        },
        coordenadas: {
            type: {
                type: String,
                enum: ["Point"],
                required: true,
            },
            coordinates: {
                type: [Number], // [longitude, latitude]
                required: true,
            },
        },
        descripcion: {
            type: String,
        },
        tiposComida: [
            {
                type: String,
            },
        ],
        rangoPrecios: {
            type: String,
            enum: ["bajo", "medio", "alto"],
        },
        horario: {
            type: String,
        },
        fotos: [
            {
                type: String,
            },
        ],
        promedioRating: {
            type: Number,
            default: 0,
        },
        cantidadResenas: {
            type: Number,
            default: 0,
        },
        estado: {
            type: String,
            enum: ["activo", "cerrado", "pendiente"],
            default: "activo",
        },
    },
    {
        timestamps: true,
    }
);

// Index for geospatial queries
placeSchema.index({ coordenadas: "2dsphere" });

const Place = mongoose.model("Place", placeSchema);

export default Place;
