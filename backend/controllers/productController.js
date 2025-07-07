// Add Product

import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModels.js";

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, bestseller } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });

        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      bestseller: bestseller === "true" ? true : false,
      image: imagesUrl,
      date: Date.now(),
    };

    const product = productModel(productData);

    await product.save();
    res.json({ success: true, message: "Product Added Successfully" });
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: error.message });
  }
};

// Get All Product

const getAllProduct = async (req, res) => {
  try {
    const products = await productModel.find({});

    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// remove Product

const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);

    res.json({
      success: true,
      message: "Product has been removed",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get One Product

const getProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const productData = await productModel.findById(productId);

    if (!productData)
      res.json({ success: false, message: "No Product with this id" });

    res.json({
      success: true,
      productData,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, removeProduct, getAllProduct, getProduct };
