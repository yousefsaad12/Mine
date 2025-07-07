import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "EGP";
  const delivery_fee = 0;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const [token, setToken] = useState("");

  const addToCart = async (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) cartData[itemId] += 1;
    else cartData[itemId] = 1;
    toast.success("Item add to the cart");
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const items in cartItems) totalCount += cartItems[items];

    return totalCount;
  };

  const updateQuantity = async (itemId, quantity) => {
    let cartDataCopy = structuredClone(cartItems);
    cartDataCopy[itemId] = quantity;

    setCartItems(cartDataCopy);

    if (token) {
      try {
        const response = await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, quantity },
          { headers: { token } }
        );

        console.log(response);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const items in cartItems) {
      let itemInfo = products.find((p) => p._id === items);

      try {
        totalAmount += itemInfo.price * cartItems[items];
      } catch (error) {}
    }

    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(
        backendUrl + "/api/product/getAllProduct"
      );

      if (response.data.success) setProducts(response.data.products);
      else toast.error(response.data.message);
    } catch (error) {
      console.log(error);

      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    if (token) {
      getUserCart(token);
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    setCartItems,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
