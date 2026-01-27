// server/repositories/ordersRepository.js
import Order from "../models/Order.js";

export async function createOrder(data) {
  return Order.create(data);
}

export async function getAllOrders() {
  return Order.find().sort({ createdAt: -1 });
}

export async function getOrderById(id) {
  return Order.findById(id);
}

export async function updateOrderById(id, data) {
  return Order.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export async function deleteOrderById(id) {
  return Order.findByIdAndDelete(id);
}
