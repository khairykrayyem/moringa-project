// server/controllers/favoritesController.js
import {
  listFavorites,
  addFavorite,
  removeFavorite,
  clearFavorites,
} from "../services/favoritesService.js";

export async function getFavorites(req, res) {
  const data = await listFavorites();
  res.json(data);
}

export async function postFavorite(req, res) {
  const createdOrExisting = await addFavorite(req.body);
  res.status(201).json(createdOrExisting);
}

export async function deleteFavorite(req, res) {
  const { productId } = req.params;
  const result = await removeFavorite(productId);
  res.json(result);
}

export async function deleteAll(req, res) {
  const result = await clearFavorites();
  res.json(result);
}
