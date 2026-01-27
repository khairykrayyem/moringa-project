import {
  addNewProduct,
  listProducts,
  getOneProduct,
  updateProduct,
  removeProduct,
} from "../services/productsService.js";

export async function createProductCtrl(req, res) {
  const created = await addNewProduct(req.body);
  res.status(201).json(created);
}

export async function getProductsCtrl(req, res) {
  const { category } = req.query; // ?category=perfumes
  const data = await listProducts(category);
  res.json(data);
}

export async function getProductCtrl(req, res) {
  const product = await getOneProduct(req.params.id);
  res.json(product);
}

export async function updateProductCtrl(req, res) {
  const updated = await updateProduct(req.params.id, req.body);
  res.json(updated);
}

export async function deleteProductCtrl(req, res) {
  const result = await removeProduct(req.params.id);
  res.json(result);
}
