import React from "react";
import Title from "../components/Title";
import NewsLetterBox from "../components/NewsLetterBox";
import { assets } from "../assets/assets";

export default function About() {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            At Mine, we believe jewelry is more than an accessory—it's a
            reflection of your story and style. With years of experience, we
            craft elegant, timeless pieces made to celebrate life’s special
            moments with quality and individuality.
          </p>
          <p>
            Our collections are designed with a deep appreciation for quality,
            artistry, and individuality. Whether you’re celebrating a milestone,
            looking for the perfect gift, or treating yourself, our jewelry is
            designed to make every moment shine.
          </p>

          <b className="text-gray-800">Our Mission</b>
          <p>
            To create meaningful, handcrafted jewelry that connects with
            people’s emotions and memories. We are passionate about quality,
            sustainability, and customer satisfaction—ensuring every piece
            reflects our values and your story.
          </p>
        </div>
      </div>

      <div className="text-2xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            We use only the finest materials, including certified gemstones and
            premium metals, ensuring that every piece meets our rigorous quality
            standards. Each item is inspected by expert artisans to guarantee
            lasting beauty and durability.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Enjoy a seamless shopping experience with our user-friendly online
            store, secure checkout, and fast, reliable shipping. Whether you're
            browsing from your phone or desktop, we make it easy to find your
            perfect piece.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Customer Service:</b>
          <p className="text-gray-600">
            Our dedicated support team is here to help you at every step—from
            styling advice to post-purchase care. We offer hassle-free returns,
            customization options, and a commitment to your complete
            satisfaction.
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
}
