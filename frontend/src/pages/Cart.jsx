import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

export default function Cart() {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const cartProducts = [];

      for (const items in cartItems) {
        if (cartItems[items] > 0) {
          cartProducts.push({
            _id: items,
            quantity: cartItems[items],
          });
        }
      }

      setCartData(cartProducts);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3 ">
        <Title text1={"YOUR"} text2={"CART"} />

        <div>
          {cartData.map((item, index) => {
            const productData = products.find((p) => p._id === item._id);

            return (
              <div
                key={index}
                className="py-4 border-t text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] item center gap-4"
              >
                <div className="flex item-start gap-6">
                  <img
                    className="w-16 sm:w-20"
                    src={productData.image[0]}
                    alt=""
                  />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {productData.name}
                    </p>
                    <div className="flex item-center gap-5 mt-2">
                      <p>
                        {currency}
                        {productData.price}
                      </p>
                    </div>
                  </div>
                </div>
                <input
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuantity(item._id, Number(e.target.value))
                  }
                  className=" text-sm border h-15 w-15 sm:w-10 px-2 py-0.5 sm:px-2"
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                />
                <img
                  onClick={() => updateQuantity(item._id, 0)}
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                  src={assets.bin_icon}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="cursor-pointer text-sm my-8 px-8 py-3 font-bold border border-yellow-500 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent transition-all duration-300 hover:bg-yellow-400 hover:text-white hover:bg-clip-border"
            >
              SUBMIT ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
