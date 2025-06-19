import React from "react";
import HeroSection from "../components/user/HeroSection";
import About from "../components/user/About";

const DashboardHero = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <HeroSection />
      <About />
    </div>
  );
};

export default DashboardHero;
