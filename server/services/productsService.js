import AppError from "../utils/AppError.js";
import {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  getProductById,
  updateProductById,
  deleteProductById,
} from "../repositories/productsRepository.js";

export async function addNewProduct(payload) {
  const { title, category, price } = payload;

  if (!title || title.trim().length < 2) {
    throw new AppError("title is required (min 2 chars)", 400);
  }
  if (!category || category.trim().length < 2) {
    throw new AppError("category is required", 400);
  }
  if (price === undefined || price === null || Number(price) < 0) {
    throw new AppError("price is required and must be >= 0", 400);
  }

  return createProduct({
    title: payload.title,
    category: payload.category,
    description: payload.description || "",
    price: Number(payload.price),
    image: payload.image || "",
    inStock: payload.inStock !== undefined ? Boolean(payload.inStock) : true,
  });
}

export async function listProducts(category) {
  if (category) return getProductsByCategory(category);
  return getAllProducts();
}

export async function getOneProduct(id) {
  const p = await getProductById(id);
  if (!p) throw new AppError("Product not found", 404);
  return p;
}

export async function updateProduct(id, payload) {
  const updated = await updateProductById(id, payload);
  if (!updated) throw new AppError("Product not found", 404);
  return updated;
}

export async function removeProduct(id) {
  const deleted = await deleteProductById(id);
  if (!deleted) throw new AppError("Product not found", 404);
  return { ok: true };
}
