import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import axios from "axios";

export default function Hero() {
  const [heroImage, setHeroImage] = useState(assets.hero_img); // Default fallback
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/settings?key=hero_image`);
        if (response.data.success && response.data.setting) {
          setHeroImage(response.data.setting.value);
        }
      } catch (error) {
        console.log("Using default hero image");
      } finally {
        setLoading(false);
      }
    };

    fetchHeroImage();
  }, []);

  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141] ">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
          </div>

          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            Latest Arrivals
          </h1>

          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          </div>
        </div>
      </div>
      {/* Hero Right Side */}

      {loading ? (
        <div className="w-full sm:w-1/2 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      ) : (
        <img className="w-full sm:w-1/2" src={heroImage} alt="Hero" />
      )}
    </div>
  );
}
