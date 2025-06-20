import React from "react";
import HeroSection from "../components/user/HeroSection";
import About from "../components/user/About";
import AdvisorDashboard from "./AdvisorDashboard";
import { useAuth } from "../contexts/AuthContext";
import Benefits from "../components/user/Benefits";
import Services from "../components/user/Services";

const DashboardHero = () => {
  const {
    user: { type },
  } = useAuth();

  return (
    <div className="flex flex-col justify-center items-center">
      {type === "advisor" ? (
        <AdvisorDashboard />
      ) : (
        <>
          <HeroSection />
          <About />
          <Benefits />
          <Services />
        </>
      )}
    </div>
  );
};

export default DashboardHero;
