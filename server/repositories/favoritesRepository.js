// server/repositories/favoritesRepository.js
import Favorite from "../models/Favorite.js";

export async function getAllFavorites() {
  return Favorite.find().sort({ createdAt: -1 });
}

export async function getFavoriteByProductId(productId) {
  return Favorite.findOne({ productId });
}

export async function createFavorite(data) {
  return Favorite.create(data);
}

export async function deleteFavoriteByProductId(productId) {
  return Favorite.deleteOne({ productId });
}

export async function deleteAllFavorites() {
  return Favorite.deleteMany({});
}
