import userModel from "../models/userModel.js";

export const addToCart = async (req, res) => {
  try {
    const { itemId, userId } = req.body;

    if (!itemId) {
      return res
        .status(400)
        .json({ success: false, message: "Item ID is required" });
    }

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartData = { ...userData.cartData };

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartData = { ...userData.cartData };

    if (quantity === 0) delete cartData[itemId];
    else cartData[itemId] = quantity;

    // Save the updated cart
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Cart updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    res.json({ success: true, cartData: cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

console.log("✅ cartController loaded");
