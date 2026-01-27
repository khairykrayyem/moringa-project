// server/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productsRoutes from "./routes/productsRoutes.js";

import favoritesRoutes from "./routes/favoritesRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";

import errorHandler from "./utils/errorHandler.js";

dotenv.config({ path: `${process.cwd()}/server/.env` });

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Server is running" });
});
app.use("/api/products", productsRoutes);

app.use("/api/favorites", favoritesRoutes);
app.use("/api/orders", ordersRoutes);

// ✅ error middleware (חייב להיות בסוף)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  });
