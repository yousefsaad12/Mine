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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            hic animi ducimus repellendus illum aperiam eveniet adipisci.
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque vel
            atque repellat tempore qui alias fugiat? Temporibus dolore.
          </p>

          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem
            quos sapiente eius? Et labore tempora ipsum, consectetur
            consequatur.
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
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore
            doloremque illo obcaecati dolor, eveniet ullam nulla qui veniam
            saepe commodi inventore quas earum exercitationem similique hic
            iure. Porro, libero! Et.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore
            doloremque illo obcaecati dolor, eveniet ullam nulla qui veniam
            saepe commodi inventore quas earum exercitationem similique hic
            iure. Porro, libero! Et.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Customer Service:</b>
          <p className="text-gray-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore
            doloremque illo obcaecati dolor, eveniet ullam nulla qui veniam
            saepe commodi inventore quas earum exercitationem similique hic
            iure. Porro, libero! Et.
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
}
