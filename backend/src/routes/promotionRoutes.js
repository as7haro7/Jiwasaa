
import express from "express";
import { getPromotions, createPromotion, updatePromotion } from "../controllers/promotionController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router({ mergeParams: true });

router.route("/")
    .get(getPromotions)
    .post(protect, admin, createPromotion);

router.get("/activas", getPromotions); // Might need separate controller function or logic in getPromotions to handle /activas without params

// But wait, mergeParams: true means if I mount this on /api/lugares/:lugarId/promociones, params.lugarId exists.
// If I mount it on /api/promociones, params.lugarId is undefined.
// "activas" logic in controller handles undefined lugarId.

router.route("/:id")
    .put(protect, admin, updatePromotion);

export default router;
