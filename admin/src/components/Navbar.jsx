import React from "react";

export default function Navbar({ setToken }) {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <div className="w-[max(10%,80px)] text-2xl font-bold bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent">
        MINE
        <span className="text-sm font-bold bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent">
          {" "}
          Admin Panel
        </span>
      </div>

      <button
        onClick={() => setToken("")}
        className="cursor-pointer sm:px-7 sm:py-2 sm:text-sm text-sm my-8 px-5 py-2 rounded-full font-bold border border-yellow-500 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent transition-all duration-300 hover:bg-yellow-400 hover:text-white hover:bg-clip-border"
      >
        Logout
      </button>
    </div>
  );
}
