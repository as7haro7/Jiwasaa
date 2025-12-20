
import express from "express";
import {
    createPlace,
    getPlaces,
    getPlaceById,
    updatePlace,
    deletePlace,
    suggestPlace,
} from "../controllers/placeController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

// Import other routers for nesting
import dishRoutes from "./dishRoutes.js";
import reviewRoutes from "./reviewRoutes.js";
import promotionRoutes from "./promotionRoutes.js";

const router = express.Router();

// Re-route into other resource routers
router.use("/:lugarId/platos", dishRoutes);
router.use("/:lugarId/reviews", reviewRoutes);
// Note: Reviews in req says /api/lugares/:lugarId/reseñas, so I map reviews to that path eventually or here.
// But standard is english or spanish? The req URL says /reseñas but file names are english. I'll stick to english file names, spanish URLs if needed or keep consistency.
// Req: /api/lugares/:lugarId/reseñas. I will use "resenas" or "reviews". Let's use "reviews" internally but alias the route if needed. 
// Actually, I'll just map it here to match req:
router.use("/:lugarId/resenas", reviewRoutes);
router.use("/:lugarId/promociones", promotionRoutes);

router.route("/")
    .get(getPlaces)
    .post(protect, admin, createPlace);

router.route("/sugerencias")
    .post(protect, suggestPlace);

router.route("/:id")
    .get(getPlaceById)
    .put(protect, admin, updatePlace)
    .delete(protect, admin, deletePlace);

export default router;
