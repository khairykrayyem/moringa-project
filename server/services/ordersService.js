// server/services/ordersService.js
import AppError from "../utils/AppError.js";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
} from "../repositories/ordersRepository.js";

const allowedStatuses = new Set(["NEW", "PREPARING", "READY", "DELIVERED"]);

// בדיקה אופציונלית ל-ObjectId של Mongo (24 hex chars)
function isValidObjectIdString(value) {
  return typeof value === "string" && /^[a-fA-F0-9]{24}$/.test(value);
}

function validateItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new AppError("items must be a non-empty array", 400);
  }

  for (const it of items) {
    // ✅ productId עכשיו מחרוזת (ObjectId)
    if (!it.productId || typeof it.productId !== "string") {
      throw new AppError("item.productId is required", 400);
    }

    // אם אתה רוצה להכריח ObjectId אמיתי:
    if (!isValidObjectIdString(it.productId)) {
      throw new AppError("item.productId must be a valid Mongo ObjectId", 400);
    }

    if (!it.title || typeof it.title !== "string") {
      throw new AppError("item.title is required", 400);
    }

    const price = Number(it.price);
    const qty = Number(it.qty);

    if (Number.isNaN(price)) throw new AppError("item.price must be a number", 400);
    if (Number.isNaN(qty) || qty < 1) throw new AppError("item.qty must be >= 1", 400);

    // נרצה לשמור ב-DB מספרים תקינים
    it.price = price;
    it.qty = qty;
  }
}

export async function createNewOrder(payload) {
  const { customerName, phone, address, items } = payload;

  if (!customerName || customerName.trim().length < 2) {
    throw new AppError("customerName is required (min 2 chars)", 400);
  }
  if (!phone || phone.trim().length < 8) {
    throw new AppError("phone is required", 400);
  }
  if (!address || address.trim().length < 3) {
    throw new AppError("address is required", 400);
  }

  validateItems(items);

  return createOrder({ customerName, phone, address, items });
}

export async function listOrders() {
  return getAllOrders();
}

export async function getOneOrder(id) {
  const order = await getOrderById(id);
  if (!order) throw new AppError("Order not found", 404);
  return order;
}

export async function updateOrder(id, payload) {
  if (payload.items) validateItems(payload.items);

  if (payload.status) {
    if (!allowedStatuses.has(payload.status)) {
      throw new AppError("Invalid status", 400);
    }
  }

  const updated = await updateOrderById(id, payload);
  if (!updated) throw new AppError("Order not found", 404);
  return updated;
}

export async function deleteOrder(id) {
  const deleted = await deleteOrderById(id);
  if (!deleted) throw new AppError("Order not found", 404);
  return { ok: true };
}
