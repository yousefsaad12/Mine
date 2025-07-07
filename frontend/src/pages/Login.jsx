import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const [currentState, setCurrentState] = useState("Login");

  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error.message);

      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === "Login" ? (
        ""
      ) : (
        <input
          className="w-full ox-3 py-2 border border-gray-800"
          type="text"
          placeholder=" Name"
          required
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <input
        className="w-full ox-3 py-2 border border-gray-800"
        type="email"
        placeholder=" Email"
        required
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full ox-3 py-2 border border-gray-800"
        type="password"
        placeholder=" Password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password ? </p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login here
          </p>
        )}
      </div>

      <button className="cursor-pointer text-sm my-8 px-8 py-3 font-bold border border-yellow-500 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent transition-all duration-300 hover:bg-yellow-400 hover:text-white hover:bg-clip-border">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
}
