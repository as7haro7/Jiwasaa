
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import { connectDB } from "../config/db.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = "admin@jiwasa.com";
    const userExists = await User.findOne({ email: adminEmail });

    if (userExists) {
      console.log("El usuario admin ya existe");
      process.exit(0);
    }

    const user = await User.create({
      nombre: "Administrador",
      email: adminEmail,
      password: "12345678", // User should change this
      rol: "admin",
      authProvider: "local"
    });

    console.log("Admin creado exitosamente:", user.email);
    process.exit(0);
  } catch (error) {
    console.error("Error al crear admin:", error);
    process.exit(1);
  }
};

createAdmin();
