import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: String, required: true },
  type: { type: String, default: "string" }, // string, image, json
  description: { type: String },
  updatedAt: { type: Date, default: Date.now }
});

const settingsModel = mongoose.model.settings || mongoose.model("settings", settingsSchema);

export default settingsModel; 