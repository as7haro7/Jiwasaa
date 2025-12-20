
import express from "express";
import { getFavorites, addFavorite, removeFavoriteByPlace } from "../controllers/favoriteController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/")
    .get(protect, getFavorites)
    .post(protect, addFavorite);

router.route("/lugar/:lugarId")
    .delete(protect, removeFavoriteByPlace);

export default router;
