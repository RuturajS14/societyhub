import React from "react";
import Navbar from "../landing/Navbar";
import Hero from "../landing/Hero";
import Features from "../landing/Features";
import Stats from "../landing/Stats";
import Footer from "../landing/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <Footer />
    </>
  );
};

export default Home;