import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
const Hero = () => {
  const { navigate } = useContext(AppContext);
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-b from-cyan-100/90">
      <div className="relative">
        <img src={assets.hero_girl} alt="hero girl image" />
        <div className="hidden md:block absolute top-20 -right-40">
          <img src={assets.hero_book} alt="hero book image" />
        </div>
      </div>
      <div>
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 ">
          Discover Your Next <br />
          <span className="text-primary">Favorite Book</span>
        </h1>
        <div className="my-10 flex flex-col md:flex-row gap-4 md:gap-10">
          <button
            className="bg-primary text-white rounded-full px-10  py-2 cursor-pointer "
            onClick={() => {
              navigate("/books");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Shop Now
          </button>
          <button
            className="bg-white text-primary border border-primary rounded-full px-10 py-2 cursor-pointer "
            onClick={() => {
              navigate("/books");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
