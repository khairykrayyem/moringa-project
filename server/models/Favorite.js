// server/models/Favorite.js
import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema(
  {
    productId: { type: Number, required: true, unique: true }, // id מהdummyjson
    title: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, default: "" },
    category: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Favorite", FavoriteSchema);
