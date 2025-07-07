import express from "express";
import {
  getSettings,
  updateSetting,
  uploadHeroImage,
  deleteSetting,
} from "../controllers/settingsController.js";
import adminAuth from "../middleware/adminAuth.js";
import upload from "../middleware/multer.js";

const settingsRouter = express.Router();

// Get settings (public endpoint for frontend)
settingsRouter.get("/", getSettings);

// Admin only routes
settingsRouter.post("/update", adminAuth, updateSetting);
settingsRouter.post("/upload-hero", adminAuth, upload.single("image"), uploadHeroImage);
settingsRouter.delete("/:key", adminAuth, deleteSetting);

export default settingsRouter; 