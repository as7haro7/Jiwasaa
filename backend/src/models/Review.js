
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        usuarioId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        lugarId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Place",
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comentario: {
            type: String,
            required: true,
        },
        fotos: [
            {
                type: String,
            },
        ],
        util: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
