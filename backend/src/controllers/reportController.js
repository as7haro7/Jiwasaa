
import Report from "../models/Report.js";

// @desc    Crear reporte
// @route   POST /api/reportes
// @access  Private
export const createReport = async (req, res) => {
  try {
    const { tipo, lugarId, reseñaId, motivo } = req.body;
    const usuarioId = req.user._id;

    const report = await Report.create({
        tipo,
        lugarId,
        reseñaId,
        usuarioId,
        motivo
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Obtener reportes (Admin)
// @route   GET /api/reportes
// @access  Private/Admin
export const getReports = async (req, res) => {
    try {
        const reports = await Report.find({})
            .populate("usuarioId", "nombre email")
            .sort({ createdAt: -1 });
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Actualizar estado reporte (Admin)
// @route   PUT /api/reportes/:id
// @access  Private/Admin
export const updateReportStatus = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        
        if (report) {
            report.estado = req.body.estado || report.estado;
            const updatedReport = await report.save();
            res.json(updatedReport);
        } else {
            res.status(404).json({ message: "Reporte no encontrado" });
        }
    } catch (error) {
         res.status(500).json({ message: error.message });
    }
}
