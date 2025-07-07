import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import { toast } from "react-toastify";

export default function Settings({ token }) {
  const [heroImage, setHeroImage] = useState("");
  const [currentHeroImage, setCurrentHeroImage] = useState("");
  const [loading, setLoading] = useState(false);

  // Load current hero image
  const loadCurrentHeroImage = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/settings?key=hero_image`);
      if (response.data.success && response.data.setting) {
        setCurrentHeroImage(response.data.setting.value);
      }
    } catch (error) {
      console.log("No hero image set yet");
    }
  };

  useEffect(() => {
    loadCurrentHeroImage();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setHeroImage(file);
  };

  const uploadHeroImage = async () => {
    if (!heroImage) {
      toast.error("Please select an image first");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", heroImage);

      const response = await axios.post(
        `${backendUrl}/api/settings/upload-hero`,
        formData,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Hero image updated successfully!");
        setCurrentHeroImage(response.data.setting.value);
        setHeroImage("");
        // Reset file input
        document.getElementById("heroImageInput").value = "";
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to upload hero image");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Settings</h2>
        <p className="text-gray-600">Manage your website content</p>
      </div>

      {/* Hero Image Management */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Hero Image</h3>
        
        {/* Current Hero Image */}
        {currentHeroImage && (
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">Current Hero Image:</p>
            <div className="relative inline-block">
              <img 
                src={currentHeroImage} 
                alt="Current Hero" 
                className="w-64 h-32 object-cover rounded-lg border border-gray-200"
              />
            </div>
          </div>
        )}

        {/* Upload New Hero Image */}
        <div className="space-y-4">
          <div>
            <label htmlFor="heroImageInput" className="block text-sm font-medium text-gray-700 mb-2">
              Upload New Hero Image
            </label>
            <input
              id="heroImageInput"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="text-xs text-gray-500 mt-1">
              Recommended size: 1200x600px, Max size: 5MB
            </p>
          </div>

          {heroImage && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
              <img 
                src={URL.createObjectURL(heroImage)} 
                alt="Preview" 
                className="w-64 h-32 object-cover rounded-lg border border-gray-200"
              />
            </div>
          )}

          <button
            onClick={uploadHeroImage}
            disabled={!heroImage || loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Uploading..." : "Update Hero Image"}
          </button>
        </div>
      </div>
    </div>
  );
} 