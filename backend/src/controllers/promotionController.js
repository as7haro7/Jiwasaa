
import Promotion from "../models/Promotion.js";

// @desc    Obtener promociones (de un lugar O todas las activas)
// @route   GET /api/lugares/:lugarId/promociones OR /api/promociones/activas
// @access  Public
export const getPromotions = async (req, res) => {
    try {
        if (req.params.lugarId) {
            // Promos de un lugar
            const promos = await Promotion.find({ lugarId: req.params.lugarId });
            res.json(promos);
        } else {
            // Promos activas globales?
            // Logic for "activas" based on date
            const today = new Date();
            const promos = await Promotion.find({
                fechaInicio: { $lte: today },
                fechaFin: { $gte: today },
                activa: true
            });
            res.json(promos);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Crear promoción
// @route   POST /api/lugares/:lugarId/promociones
// @access  Private/Admin
export const createPromotion = async (req, res) => {
    try {
        req.body.lugarId = req.params.lugarId;
        const promo = await Promotion.create(req.body);
        res.status(201).json(promo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Actualizar promoción
// @route   PUT /api/promociones/:id
// @access  Private/Admin
export const updatePromotion = async (req, res) => {
    try {
        const promo = await Promotion.findById(req.params.id);
        if (promo) {
            promo.titulo = req.body.titulo || promo.titulo;
            promo.descripcion = req.body.descripcion || promo.descripcion;
            promo.precioPromo = req.body.precioPromo || promo.precioPromo;
            promo.descuentoPorcentaje = req.body.descuentoPorcentaje || promo.descuentoPorcentaje;
            promo.fechaInicio = req.body.fechaInicio || promo.fechaInicio;
            promo.fechaFin = req.body.fechaFin || promo.fechaFin;
            promo.activa = req.body.activa !== undefined ? req.body.activa : promo.activa;

            const updatedPromo = await promo.save();
            res.json(updatedPromo);
        } else {
            res.status(404).json({ message: "Promoción no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
