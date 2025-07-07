import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
export default function CartTotal() {
  const { currency, getCartAmount } = useContext(ShopContext);
  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTAL"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>SubTotal</p>
          <p>
            {currency}
            {getCartAmount()}.00
          </p>
        </div>

        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency} {getCartAmount()}.00{" "}
          </b>
        </div>
      </div>
    </div>
  );
}
