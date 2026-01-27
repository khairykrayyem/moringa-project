// server/routes/ordersRoutes.js
import express from "express";
import asyncHandler from "../utils/asyncHandler.js";
import {
  createOrderCtrl,
  getOrdersCtrl,
  getOrderCtrl,
  updateOrderCtrl,
  deleteOrderCtrl,
} from "../controllers/ordersController.js";

const router = express.Router();

router.post("/", asyncHandler(createOrderCtrl));
router.get("/", asyncHandler(getOrdersCtrl));
router.get("/:id", asyncHandler(getOrderCtrl));
router.put("/:id", asyncHandler(updateOrderCtrl));
router.delete("/:id", asyncHandler(deleteOrderCtrl));

export default router;
