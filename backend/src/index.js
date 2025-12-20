// src/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import placeRoutes from "./routes/placeRoutes.js";
import dishRoutes from "./routes/dishRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import promotionRoutes from "./routes/promotionRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.json({ message: "API JIWASA" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/lugares", placeRoutes);
app.use("/api/platos", dishRoutes); // For update/delete where ID is known
app.use("/api/resenas", reviewRoutes); // For helpful mark etc
app.use("/api/promociones", promotionRoutes); // For global list or direct edit
app.use("/api/favoritos", favoriteRoutes);
app.use("/api/reportes", reportRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor backend escuchando en puerto ${PORT}`);
});
