
import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     SponsoredPlacement:
 *       type: object
 *       required:
 *         - lugarId
 *         - posicion
 *         - fechaInicio
 *         - fechaFin
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id
 *         lugarId:
 *           type: string
 *           description: The place being sponsored
 *         posicion:
 *           type: string
 *           enum: [home_top, list_result, map_banner]
 *           description: Where the ad appears
 *         fechaInicio:
 *           type: string
 *           format: date-time
 *         fechaFin:
 *           type: string
 *           format: date-time
 *         activo:
 *           type: boolean
 *           default: true
 *         peso:
 *           type: number
 *           description: Priority weight (1-10)
 *       example:
 *         posicion: home_top
 *         peso: 10
 *         activo: true
 */

const sponsoredPlacementSchema = new mongoose.Schema(
    {
        lugarId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Place",
            required: true,
        },
        posicion: {
            type: String,
            enum: ["home_top", "list_result", "map_banner"],
            required: true,
        },
        fechaInicio: {
            type: Date,
            required: true,
        },
        fechaFin: {
            type: Date,
            required: true,
        },
        activo: {
            type: Boolean,
            default: true,
        },
        peso: {
            type: Number,
            min: 1,
            max: 10,
            default: 1,
            // Higher weight = higher priority/frequency
        },
    },
    {
        timestamps: true,
    }
);

// Index to quickly find active sponsored placements
sponsoredPlacementSchema.index({ activo: 1, fechaInicio: 1, fechaFin: 1 });

const SponsoredPlacement = mongoose.model("SponsoredPlacement", sponsoredPlacementSchema);

export default SponsoredPlacement;
