
import Dish from "../models/Dish.js";

// @desc    Obtener platos (de un lugar específico o todos - aunque todos no es común sin filtros)
// @route   GET /api/lugares/:lugarId/platos
// @access  Public
export const getDishes = async (req, res) => {
    try {
        if (req.params.lugarId) {
            const dishes = await Dish.find({ lugarId: req.params.lugarId });
            res.json(dishes);
        } else {
            // Si se quisiera listar todos los platos, cuidado con performance
            res.status(400).json({ message: "Falta ID de lugar" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Crear un plato
// @route   POST /api/lugares/:lugarId/platos
// @access  Private/Admin
export const createDish = async (req, res) => {
    try {
        req.body.lugarId = req.params.lugarId; // Inject parent ID

        const dish = await Dish.create(req.body);
        res.status(201).json(dish);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Actualizar plato
// @route   PUT /api/platos/:id
// @access  Private/Admin
export const updateDish = async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.id);

        if (dish) {
            dish.nombre = req.body.nombre || dish.nombre;
            dish.descripcion = req.body.descripcion || dish.descripcion;
            dish.precio = req.body.precio || dish.precio;
            dish.categoria = req.body.categoria || dish.categoria;
            dish.etiquetas = req.body.etiquetas || dish.etiquetas;
            dish.disponible = req.body.disponible !== undefined ? req.body.disponible : dish.disponible;

            const updatedDish = await dish.save();
            res.json(updatedDish);
        } else {
            res.status(404).json({ message: "Plato no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Eliminar plato
// @route   DELETE /api/platos/:id
// @access  Private/Admin
export const deleteDish = async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.id);

        if (dish) {
            await dish.deleteOne(); // or remove() depending on Mongoose version, deleteOne is safer now
            res.json({ message: "Plato eliminado" });
        } else {
            res.status(404).json({ message: "Plato no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
