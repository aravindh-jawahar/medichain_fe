import React from "react";
import { useNavigate } from "react-router";

const departments = [
  {
    name: "General care",
    image: "/service_1.jpg",
  },
  {
    name: "Cardiology",
    image: "/service_2.jpg",
  },
  {
    name: "Orthopedics",
    image: "/service_3.jpg",
  },
  {
    name: "Gastroenterology",
    image: "/service_4.jpg",
  },
  {
    name: "Neurology",
    image: "/service_5.jpg",
  },
  {
    name: "Pediatrics",
    image: "/service_6.jpg",
  },
];
const Services = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/ai-service");
  };
  return (
    <section className="py-5 md:py-20 bg-white text-gray-800 flex flex-col justify-center items-center max-w-7xl !px-5">
      <div className="text-center mb-14 flex flex-col !gap-4">
        <span className="text-6xl font-extrabold !text-[#057c8b] text-center px-6 py-2">
          Services
        </span>

        <div className="flex flex-col gap-1 font-medium">
          <h2 className="text-2xl sm:text-3xl font-bold max-w-3xl mx-auto">
            Expert care made simple
          </h2>
          <span>
            We offer a wide range of expert-led healthcare services built to
            support your well-being
          </span>
        </div>
      </div>

      <button
        onClick={handleNavigate}
        className="!p-3 !bg-[#057c8b] text-white !rounded-full shadow hover:bg-[#04606e]"
      >
        Explore instant service
      </button>

      <section className="mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept, idx) => (
          <div
            key={idx}
            className="relative group overflow-hidden rounded-2xl shadow-md cursor-pointer"
          >
            <img
              src={dept.image}
              alt={dept.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

            {/* Text and icon */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white z-10">
              <h3 className="text-lg font-semibold">{dept.name}</h3>
            </div>
          </div>
        ))}
      </section>

      <button
        onClick={handleNavigate}
        className="!p-3 !bg-[#057c8b] text-white !rounded-full shadow hover:bg-[#04606e]"
      >
        All Services
      </button>
    </section>
  );
};

export default Services;
