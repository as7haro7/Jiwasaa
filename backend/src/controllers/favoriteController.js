
import Favorite from "../models/Favorite.js";
import Place from "../models/Place.js";

// @desc    Obtener favoritos del usuario
// @route   GET /api/favoritos
// @access  Private
export const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ usuarioId: req.user._id })
      .populate("lugarId"); // Get place details
    
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Añadir a favoritos
// @route   POST /api/favoritos
// @access  Private
// Body: { "lugarId": "..." }
export const addFavorite = async (req, res) => {
  try {
    const { lugarId } = req.body;
    const usuarioId = req.user._id;

    const exists = await Favorite.findOne({ usuarioId, lugarId });
    if (exists) {
        return res.status(400).json({ message: "El lugar ya está en favoritos" });
    }

    const favorite = await Favorite.create({
        usuarioId,
        lugarId
    });

    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Eliminar favorito (por ID de favorito o por lugarId?)
// @route   DELETE /api/favoritos/:id  -> Here :id is favorite ID usually, or place ID? 
// Be consistent. Usually DELETE /api/favoritos/:id deletes the helper object.
// But frontend might only have placeId. Let's support both or just favorite ID. 
// Easier to delete by placeID if called from Place Detail page. 
// BUT Restful standard: DELETE /resource/:id.
// Let's assume :id is the PLACE ID for easier toggling? No, that's unsafe API design sometimes. 
// Let's assume :id is the Lugar ID for convenience `DELETE /api/favoritos/lugar/:lugarId` or search query. 
// Let's stick to standard: DELETE /api/favoritos/:id (Favorite Document ID).
// Check requirements: "RF-B22 – Añadir favorito", "RF-B23 – Listar". No delete mentioned but obvious. 
// I will implement DELETE /api/favoritos/:lugarId since client likely wants to toggle "Heart" on a Place.
// Let's make it DELETE /api/favoritos/lugar/:lugarId
export const removeFavoriteByPlace = async (req, res) => {
    try {
        const usuarioId = req.user._id;
        const lugarId = req.params.lugarId;

        const deleted = await Favorite.findOneAndDelete({ usuarioId, lugarId });
        
        if(deleted) {
            res.json({ message: "Eliminado de favoritos" });
        } else {
            res.status(404).json({ message: "No estaba en favoritos" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
