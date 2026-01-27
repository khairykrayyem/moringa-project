// server/routes/favoritesRoutes.js
import express from "express";
import asyncHandler from "../utils/asyncHandler.js";
import {
  getFavorites,
  postFavorite,
  deleteFavorite,
  deleteAll,
} from "../controllers/favoritesController.js";

const router = express.Router();

router.get("/", asyncHandler(getFavorites));
router.post("/", asyncHandler(postFavorite));
router.delete("/all", asyncHandler(deleteAll));           // אופציונלי: ניקוי מלא מה-DB
router.delete("/:productId", asyncHandler(deleteFavorite));

export default router;
