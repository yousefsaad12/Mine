import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

export default function Product() {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex overflow-x-auto sm:flex-col sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full ">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                alt=""
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>

          <button
            onClick={() => addToCart(productData._id)}
            className="cursor-pointer text-sm my-8 px-8 py-3 font-bold border border-yellow-500 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent transition-all duration-300 hover:bg-yellow-400 hover:text-white hover:bg-clip-border"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100 % Pure Stainless Steel</p>
            <p>Cash on delivery is available</p>
          </div>
        </div>
      </div>
      <div className="mt-20">
        {" "}
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews(122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            quisquam at, quam quas dolorem ullam assumenda blanditiis quod
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea culpa
            sed perferendis odit. Facere architecto cum nemo dolor error
          </p>
        </div>
        {/* Related Product */}
        <RelatedProducts category={productData.category} />
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}
