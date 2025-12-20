
import Place from "../models/Place.js";

// @desc    Obtener lugares con filtros y paginación
// @route   GET /api/lugares
// @access  Public
export const getPlaces = async (req, res) => {
    try {
        const pageSize = 10;
        const page = Number(req.query.pageNumber) || 1;

        const keyword = req.query.keyword
            ? {
                $or: [
                    { nombre: { $regex: req.query.keyword, $options: "i" } },
                    { "tiposComida": { $regex: req.query.keyword, $options: "i" } },
                    { zona: { $regex: req.query.keyword, $options: "i" } },
                    { direccion: { $regex: req.query.keyword, $options: "i" } },
                ],
            }
            : {};

        const filter = { ...keyword, estado: "activo" };

        if (req.query.zona) {
            filter.zona = req.query.zona;
        }
        if (req.query.tipo) {
            filter.tipo = req.query.tipo;
        }

        const count = await Place.countDocuments(filter);
        const places = await Place.find(filter)
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.json({ places, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Obtener un lugar por ID
// @route   GET /api/lugares/:id
// @access  Public
export const getPlaceById = async (req, res) => {
    try {
        const place = await Place.findById(req.params.id);

        if (place) {
            res.json(place);
        } else {
            res.status(404).json({ message: "Lugar no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Crear un lugar (Admin)
// @route   POST /api/lugares
// @access  Private/Admin
export const createPlace = async (req, res) => {
    try {
        const {
            nombre,
            tipo,
            direccion,
            zona,
            coordenadas, // Expecting { type: "Point", coordinates: [long, lat] }
            descripcion,
            tiposComida,
            rangoPrecios,
            horario,
            fotos,
        } = req.body;

        const place = new Place({
            nombre,
            tipo,
            direccion,
            zona,
            coordenadas,
            descripcion,
            tiposComida,
            rangoPrecios,
            horario,
            fotos,
        });

        const createdPlace = await place.save();
        res.status(201).json(createdPlace);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Actualizar un lugar (Admin)
// @route   PUT /api/lugares/:id
// @access  Private/Admin
export const updatePlace = async (req, res) => {
    try {
        const place = await Place.findById(req.params.id);

        if (place) {
            place.nombre = req.body.nombre || place.nombre;
            place.tipo = req.body.tipo || place.tipo;
            place.direccion = req.body.direccion || place.direccion;
            place.zona = req.body.zona || place.zona;
            place.coordenadas = req.body.coordenadas || place.coordenadas;
            place.descripcion = req.body.descripcion || place.descripcion;
            place.tiposComida = req.body.tiposComida || place.tiposComida;
            place.rangoPrecios = req.body.rangoPrecios || place.rangoPrecios;
            place.horario = req.body.horario || place.horario;
            place.fotos = req.body.fotos || place.fotos;
            place.estado = req.body.estado || place.estado;

            const updatedPlace = await place.save();
            res.json(updatedPlace);
        } else {
            res.status(404).json({ message: "Lugar no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Eliminar/Cerrar un lugar (Admin)
// @route   DELETE /api/lugares/:id
// @access  Private/Admin
// Note: Soft delete by setting state to 'cerrado' or physical delete? Req says "o cambio de estado a cerrado". Defaults to soft delete logic here unless specified.
export const deletePlace = async (req, res) => {
    try {
        const place = await Place.findById(req.params.id);

        if (place) {
            place.estado = "cerrado";
            await place.save();
            res.json({ message: "Lugar marcado como cerrado" });
        } else {
            res.status(404).json({ message: "Lugar no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Sugerir un nuevo lugar (Usuario)
// @route   POST /api/lugares/sugerencias
// @access  Private
export const suggestPlace = async (req, res) => {
    try {
        const {
            nombre,
            tipo,
            direccion,
            zona,
            coordenadas,
            descripcion,
            tiposComida,
            rangoPrecios,
            horario,
        } = req.body;

        const place = new Place({
            nombre,
            tipo,
            direccion,
            zona,
            coordenadas,
            descripcion,
            tiposComida,
            rangoPrecios,
            horario,
            estado: "pendiente", // Important: set to pending
        });

        const createdPlace = await place.save();
        res.status(201).json({ message: "Sugerencia enviada", place: createdPlace });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
