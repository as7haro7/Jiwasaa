
import express from "express";
import {
    getDishes,
    createDish,
    updateDish,
    deleteDish,
} from "../controllers/dishController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router({ mergeParams: true });

router.route("/")
    .get(getDishes)
    .post(protect, admin, createDish);

router.route("/:id")
    .put(protect, admin, updateDish)
    .delete(protect, admin, deleteDish);

export default router;
