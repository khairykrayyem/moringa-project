import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true }, // למשל "perfumes"
    description: { type: String, default: "", trim: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, default: "" }, // URL או path
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
