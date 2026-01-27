// server/controllers/ordersController.js
import {
  createNewOrder,
  listOrders,
  getOneOrder,
  updateOrder,
  deleteOrder,
} from "../services/ordersService.js";

export async function createOrderCtrl(req, res) {
  const order = await createNewOrder(req.body);
  res.status(201).json(order);
}

export async function getOrdersCtrl(req, res) {
  const orders = await listOrders();
  res.json(orders);
}

export async function getOrderCtrl(req, res) {
  const order = await getOneOrder(req.params.id);
  res.json(order);
}

export async function updateOrderCtrl(req, res) {
  const updated = await updateOrder(req.params.id, req.body);
  res.json(updated);
}

export async function deleteOrderCtrl(req, res) {
  const result = await deleteOrder(req.params.id);
  res.json(result);
}
