import express from "express";

import {
  placeOrder,
  allOrders,
  userOrderData,
  updateStatus,
  getAvailableDates,
  deleteOrder,
} from "../controllers/orderController.js";

import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/list", adminAuth, allOrders);

orderRouter.post("/status", adminAuth, updateStatus);

orderRouter.get("/available-dates", adminAuth, getAvailableDates);

orderRouter.post("/place", authUser, placeOrder);

orderRouter.post("/userOrders", authUser, userOrderData);

orderRouter.post("/delete", adminAuth, deleteOrder);

export default orderRouter;
