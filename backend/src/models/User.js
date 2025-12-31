import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - nombre
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         nombre:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user (hashed)
 *         authProvider:
 *           type: string
 *           enum: [local, google]
 *           description: Authentication provider
 *         biografia:
 *           type: string
 *           description: User biography
 *         telefono:
 *           type: string
 *           description: User phone number
 *         rol:
 *           type: string
 *           enum: [usuario, admin]
 *           default: usuario
 *           description: User role
 *         fotoPerfil:
 *           type: string
 *           description: URL of profile picture
 *         preferenciasComida:
 *           type: array
 *           items:
 *             type: string
 *           description: List of food preferences
 *         esPropietario:
 *           type: boolean
 *           default: false
 *           description: Whether the user is a place owner
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the user was added
 *       example:
 *         nombre: Carlos Mamani
 *         email: carlos@example.com
 *         rol: usuario
 *         esPropietario: false
 */

const userSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      // Password is not required if using Google Auth
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple nulls
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    biografia: {
      type: String,
    },
    telefono: {
      type: String,
    },
    rol: {
      type: String,
      enum: ["usuario", "admin"],
      default: "usuario",
    },
    fotoPerfil: {
      type: String,
    },
    preferenciasComida: [
      {
        type: String,
      },
    ],
    esPropietario: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Method to check password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware to hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
