import React from "react";
import HeroSection from "../components/user/HeroSection";
import About from "../components/user/About";
import AdvisorDashboard from "./AdvisorDashboard"
import { useAuth } from "../contexts/AuthContext"

const DashboardHero = () => {

  const { user: { type } } = useAuth()

  return (
    <div className="flex flex-col justify-center items-center">
     {type === 'advisor'?
     <AdvisorDashboard /> :
     <>
      <HeroSection />
      <About />
      </>}
    </div>
  );
};

export default DashboardHero;
