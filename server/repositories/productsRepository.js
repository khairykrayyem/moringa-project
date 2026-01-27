import Product from "../models/Product.js";

export async function createProduct(data) {
  return Product.create(data);
}

export async function getAllProducts() {
  return Product.find().sort({ createdAt: -1 });
}

export async function getProductsByCategory(category) {
  return Product.find({ category }).sort({ createdAt: -1 });
}

export async function getProductById(id) {
  return Product.findById(id);
}

export async function updateProductById(id, data) {
  return Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export async function deleteProductById(id) {
  return Product.findByIdAndDelete(id);
}

