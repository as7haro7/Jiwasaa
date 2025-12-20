
import express from "express";
import { getReviews, createReview, markReviewHelpful } from "../controllers/reviewController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router({ mergeParams: true });

router.route("/")
    .get(getReviews)
    .post(protect, createReview);

router.route("/:id/util")
    .post(protect, markReviewHelpful);

export default router;
