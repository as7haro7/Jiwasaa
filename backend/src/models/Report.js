
import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    tipo: {
      type: String,
      enum: ["lugar", "reseña"],
      required: true,
    },
    lugarId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
    },
    reseñaId: {
      // Use "reviewId" or "resenaId"? Keeping consistent with "reseña" in docs but "review" in models?
      // Model is Review.js
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
    usuarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    motivo: {
      type: String,
      required: true,
    },
    estado: {
      type: String,
      enum: ["pendiente", "resuelto", "descartado"],
      default: "pendiente",
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", reportSchema);

export default Report;
