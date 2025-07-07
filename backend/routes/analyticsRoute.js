import express from "express";
import {
  getDashboardAnalytics,
  getSalesTrends,
  getProductAnalytics,
} from "../controllers/analyticsController.js";
import adminAuth from "../middleware/adminAuth.js";

const analyticsRouter = express.Router();

analyticsRouter.post("/dashboard", adminAuth, getDashboardAnalytics);
analyticsRouter.post("/sales-trends", adminAuth, getSalesTrends);
analyticsRouter.post("/product-analytics", adminAuth, getProductAnalytics);

export default analyticsRouter; 