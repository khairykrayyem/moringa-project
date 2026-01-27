// server/models/Order.js
import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    items: { type: [OrderItemSchema], required: true },
    status: {
      type: String,
      enum: ["NEW", "PREPARING", "READY", "DELIVERED"],
      default: "NEW",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
