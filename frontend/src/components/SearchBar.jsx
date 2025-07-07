import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

export default function SearchBar() {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [hidden, setHidden] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")) setHidden(true);
    else setHidden(false);
  }, [location]);

  return showSearch && hidden ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex item-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img className="w-5" src={assets.search_icon} alt="" />
      </div>
      <img
        className="inline w-3 cursor-pointer"
        src={assets.cross_icon}
        alt=""
        onClick={() => setShowSearch(false)}
      />
    </div>
  ) : null;
}
