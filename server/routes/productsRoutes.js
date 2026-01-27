import express from "express";
import asyncHandler from "../utils/asyncHandler.js";
import {
  createProductCtrl,
  getProductsCtrl,
  getProductCtrl,
  updateProductCtrl,
  deleteProductCtrl,
} from "../controllers/productsController.js";

const router = express.Router();

router.post("/", asyncHandler(createProductCtrl));
router.get("/", asyncHandler(getProductsCtrl));          // /api/products?category=perfumes
router.get("/:id", asyncHandler(getProductCtrl));
router.put("/:id", asyncHandler(updateProductCtrl));
router.delete("/:id", asyncHandler(deleteProductCtrl));

export default router;
