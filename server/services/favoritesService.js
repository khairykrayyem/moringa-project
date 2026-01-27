// server/services/favoritesService.js
import AppError from "../utils/AppError.js";
import {
  getAllFavorites,
  getFavoriteByProductId,
  createFavorite,
  deleteFavoriteByProductId,
  deleteAllFavorites,
} from "../repositories/favoritesRepository.js";

export async function listFavorites() {
  return getAllFavorites();
}

export async function addFavorite(payload) {
  const { productId, title, price, thumbnail = "", category = "" } = payload;

  if (productId === undefined || productId === null) {
    throw new AppError("productId is required", 400);
  }
  if (!title) throw new AppError("title is required", 400);
  if (price === undefined || price === null) throw new AppError("price is required", 400);

  const pid = Number(productId);
  if (Number.isNaN(pid)) throw new AppError("productId must be a number", 400);

  const exists = await getFavoriteByProductId(pid);
  if (exists) {
    // לא זורקים שגיאה—מחזירים את הקיים (ידידותי ל-UI)
    return exists;
  }

  return createFavorite({ productId: pid, title, price, thumbnail, category });
}

export async function removeFavorite(productId) {
  const pid = Number(productId);
  if (Number.isNaN(pid)) throw new AppError("productId must be a number", 400);

  await deleteFavoriteByProductId(pid);
  return { ok: true };
}

export async function clearFavorites() {
  await deleteAllFavorites();
  return { ok: true };
}
