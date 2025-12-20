
import Review from "../models/Review.js";
import Place from "../models/Place.js";

// @desc    Obtener reseñas de un lugar
// @route   GET /api/lugares/:lugarId/resenas
// @access  Public
export const getReviews = async (req, res) => {
    try {
        const pageSize = 5;
        const page = Number(req.query.pageNumber) || 1;

        // Sort logic (future)

        const count = await Review.countDocuments({ lugarId: req.params.lugarId });
        const reviews = await Review.find({ lugarId: req.params.lugarId })
            .sort({ createdAt: -1 })
            .populate("usuarioId", "nombre fotoPerfil") // Populate user info
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.json({ reviews, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Crear reseña
// @route   POST /api/lugares/:lugarId/resenas
// @access  Private
export const createReview = async (req, res) => {
    try {
        const { rating, comentario, fotos } = req.body;
        const lugarId = req.params.lugarId;
        const usuarioId = req.user._id;

        // Check if user already reviewed? Optional check but good practice
        const alreadyReviewed = await Review.findOne({ lugarId, usuarioId });
        if (alreadyReviewed) {
            return res.status(400).json({ message: "Ya escribiste una reseña para este lugar" });
        }

        const review = await Review.create({
            lugarId,
            usuarioId,
            rating: Number(rating),
            comentario,
            fotos,
        });

        // Recalculate Place stats
        const place = await Place.findById(lugarId);
        if (place) {
            const reviews = await Review.find({ lugarId });
            place.cantidadResenas = reviews.length;
            place.promedioRating =
                reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
            await place.save();
        }

        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Marcar como útil
// @route   POST /api/resenas/:id/util
// @access  Private
export const markReviewHelpful = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (review) {
            review.util = (review.util || 0) + 1;
            await review.save();
            res.json({ message: "Reseña marcada como útil", util: review.util });
        } else {
            res.status(404).json({ message: "Reseña no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
