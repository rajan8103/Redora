import React, { useContext, useEffect } from "react";

import Hero from "../components/Hero";
import Search from "../components/Search";
import Category from "../components/category";
import NewArrival from "../components/NewArrival";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
const Home = () => {
  const { setSearchQuery, setSelectedCategory } = useContext(AppContext);
  useEffect(() => {
    setSearchQuery("");
    setSelectedCategory("");
  }, []);
  return (
    <div>
      <Hero />
      <Search />
      <Category />
      <NewArrival />
      <NewsLetter />
    </div>
  );
};

export default Home;
