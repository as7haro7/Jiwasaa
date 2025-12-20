
import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate favorites (same user, same place)
favoriteSchema.index({ usuarioId: 1, lugarId: 1 }, { unique: true });

const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;
