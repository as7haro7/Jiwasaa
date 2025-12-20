
import User from "../models/User.js";

// @desc    Obtener perfil del usuario
// @route   GET /api/users/me
// @access  Private
export const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            nombre: user.nombre,
            email: user.email,
            rol: user.rol,
            fotoPerfil: user.fotoPerfil,
            preferenciasComida: user.preferenciasComida,
        });
    } else {
        res.status(404).json({ message: "Usuario no encontrado" });
    }
};

// @desc    Actualizar perfil del usuario
// @route   PUT /api/users/me
// @access  Private
export const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.nombre = req.body.nombre || user.nombre;
        user.fotoPerfil = req.body.fotoPerfil || user.fotoPerfil;
        user.preferenciasComida = req.body.preferenciasComida || user.preferenciasComida;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
  
        res.json({
            _id: updatedUser._id,
            nombre: updatedUser.nombre,
            email: updatedUser.email,
            rol: updatedUser.rol,
            fotoPerfil: updatedUser.fotoPerfil,
            preferenciasComida: updatedUser.preferenciasComida,
            token: req.body.token, // Usually not updated here, but maintained if needed
        });
    } else {
        res.status(404).json({ message: "Usuario no encontrado" });
    }
};


