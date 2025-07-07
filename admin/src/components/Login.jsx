import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="email"
              placeholder="Enter Your Email"
              required
            />
          </div>

          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="password"
              placeholder="Enter Your Password"
              required
            />
          </div>

          <button
            className="cursor-pointer w-full mt-2 py-2 px-4 rounded-md font-bold border border-yellow-500 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent transition-all duration-300 hover:bg-yellow-400 hover:text-white hover:bg-clip-border"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
