
import SponsoredPlacement from "../models/SponsoredPlacement.js";

// @desc    Obtener ubicaciones patrocinadas activas (Public)
// @route   GET /api/sponsored
// @access  Public
export const getActiveSponsored = async (req, res) => {
    try {
        const now = new Date();
        // Find active and within date range
        // sort by peso desc (higher weight first)
        const sponsored = await SponsoredPlacement.find({
            activo: true,
            fechaInicio: { $lte: now },
            fechaFin: { $gte: now },
        })
            .populate("lugarId", "nombre fotos promedioRating zona tipo") // Populate basic info
            .sort({ peso: -1 });

        res.json(sponsored);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Crear ubicación patrocinada (Admin)
// @route   POST /api/sponsored
// @access  Private/Admin
export const createSponsored = async (req, res) => {
    try {
        const { lugarId, posicion, fechaInicio, fechaFin, activo, peso } = req.body;

        const sponsored = new SponsoredPlacement({
            lugarId,
            posicion,
            fechaInicio,
            fechaFin,
            activo,
            peso,
        });

        const createdSponsored = await sponsored.save();
        res.status(201).json(createdSponsored);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Obtener detalle de ubicación patrocinada (Admin)
// @route   GET /api/sponsored/:id
// @access  Private/Admin
export const getSponsoredById = async (req, res) => {
    try {
        const sponsored = await SponsoredPlacement.findById(req.params.id).populate("lugarId");
        if (sponsored) {
            res.json(sponsored);
        } else {
            res.status(404).json({ message: "Ubicación patrocinada no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Actualizar ubicación patrocinada (Admin)
// @route   PUT /api/sponsored/:id
// @access  Private/Admin
export const updateSponsored = async (req, res) => {
    try {
        const sponsored = await SponsoredPlacement.findById(req.params.id);

        if (sponsored) {
            sponsored.lugarId = req.body.lugarId || sponsored.lugarId;
            sponsored.posicion = req.body.posicion || sponsored.posicion;
            sponsored.fechaInicio = req.body.fechaInicio || sponsored.fechaInicio;
            sponsored.fechaFin = req.body.fechaFin || sponsored.fechaFin;
            sponsored.activo = req.body.activo !== undefined ? req.body.activo : sponsored.activo;
            sponsored.peso = req.body.peso || sponsored.peso;

            const updatedSponsored = await sponsored.save();
            res.json(updatedSponsored);
        } else {
            res.status(404).json({ message: "Ubicación patrocinada no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Eliminar ubicación patrocinada (Admin)
// @route   DELETE /api/sponsored/:id
// @access  Private/Admin
export const deleteSponsored = async (req, res) => {
    try {
        const sponsored = await SponsoredPlacement.findById(req.params.id);

        if (sponsored) {
            await sponsored.deleteOne();
            res.json({ message: "Ubicación patrocinada eliminada" });
        } else {
            res.status(404).json({ message: "Ubicación patrocinada no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
