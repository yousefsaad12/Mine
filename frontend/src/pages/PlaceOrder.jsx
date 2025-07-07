import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function PlaceOrder() {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];
      for (const item in cartItems) {
        if (cartItems[item] > 0) {
          const itemInfo = structuredClone(
            products.find((p) => p._id === item)
          );

          if (itemInfo) {
            itemInfo.quantity = cartItems[item];
            orderItems.push(itemInfo);
          }
        }
      }

      console.log(orderItems);

      let orderData = {
        address: formData,
        phone: formData,
        items: orderItems,
        amount: getCartAmount(),
      };

      const response = await axios.post(
        backendUrl + "/api/order/place",
        orderData,
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems({});
        toast.success(response.data.message);
        navigate("/orders");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {}
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t "
    >
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            type="text"
            placeholder="First name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
          type="email"
          placeholder="Email"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
          type="text"
          placeholder="Street"
        />

        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            type="text"
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            type="text"
            placeholder="State"
          />
        </div>

        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipCode"
            value={formData.zipCode}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            type="number"
            placeholder="Zipcode"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
          type="number"
          placeholder="Phone"
        />
      </div>

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
          <div className="mt-12">
            <Title text1={"PAYMENT"} text2={"METHOD"} />

            <div
              onClick={() => setMethod("cod")}
              className="flex gap-3 flex-col lg:flex-row"
            >
              <div className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "cod" ? "bg-amber-300" : ""
                  }`}
                ></p>
                <p className="text-gray-500 text-sm font-medium mx-4">
                  CASH ON DELIVERY
                </p>
              </div>
            </div>

            <div className="w-full text-end mt-8">
              <button
                type="submit"
                className="cursor-pointer text-sm my-8 px-8 py-3 font-bold border border-yellow-500 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent transition-all duration-300 hover:bg-yellow-400 hover:text-white hover:bg-clip-border"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
