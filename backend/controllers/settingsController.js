import settingsModel from "../models/settingsModel.js";
import { v2 as cloudinary } from "cloudinary";

const getSettings = async (req, res) => {
  try {
    const { key } = req.query;
    
    if (key) {
      // Get specific setting
      const setting = await settingsModel.findOne({ key });
      if (!setting) {
        return res.json({ success: false, message: "Setting not found" });
      }
      res.json({ success: true, setting });
    } else {
      // Get all settings
      const settings = await settingsModel.find({});
      res.json({ success: true, settings });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateSetting = async (req, res) => {
  try {
    const { key, value, type = "string", description } = req.body;
    
    if (!key || !value) {
      return res.json({ success: false, message: "Key and value are required" });
    }

    const setting = await settingsModel.findOneAndUpdate(
      { key },
      { value, type, description, updatedAt: Date.now() },
      { upsert: true, new: true }
    );

    res.json({ success: true, setting, message: "Setting updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const uploadHeroImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({ success: false, message: "No image uploaded" });
    }

    // Get current hero image to delete it later
    const currentSetting = await settingsModel.findOne({ key: "hero_image" });
    let oldImagePublicId = null;
    
    if (currentSetting && currentSetting.value) {
      // Extract public_id from Cloudinary URL
      const urlParts = currentSetting.value.split('/');
      const filename = urlParts[urlParts.length - 1].split('.')[0];
      oldImagePublicId = `hero-images/${filename}`;
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "hero-images",
      transformation: [
        { width: 1200, height: 600, crop: "fill", quality: "auto" },
        { fetch_format: "auto" }
      ]
    });

    // Delete the temporary file
    const fs = await import('fs');
    fs.unlinkSync(req.file.path);

    // Delete old image from Cloudinary if it exists
    if (oldImagePublicId) {
      try {
        await cloudinary.uploader.destroy(oldImagePublicId);
        console.log("Old hero image deleted from Cloudinary");
      } catch (deleteError) {
        console.log("Could not delete old image:", deleteError.message);
      }
    }

    // Update or create hero image setting with Cloudinary URL
    const setting = await settingsModel.findOneAndUpdate(
      { key: "hero_image" },
      { 
        value: result.secure_url, 
        type: "image", 
        description: "Hero section background image",
        updatedAt: Date.now()
      },
      { upsert: true, new: true }
    );

    res.json({ 
      success: true, 
      setting, 
      message: "Hero image updated successfully" 
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const deleteSetting = async (req, res) => {
  try {
    const { key } = req.params;
    
    const setting = await settingsModel.findOneAndDelete({ key });
    
    if (!setting) {
      return res.json({ success: false, message: "Setting not found" });
    }

    res.json({ success: true, message: "Setting deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { getSettings, updateSetting, uploadHeroImage, deleteSetting }; 