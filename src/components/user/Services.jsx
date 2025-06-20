import React from "react";
import { useNavigate } from "react-router";

const aiServices = [
  {
    name: "AI Medical Assistance",
    image: "/service_1.jpg",
  },
  {
    name: "Document Upload & Report Analysis",
    image: "/service_2.jpg",
  },
  {
    name: "Body Health Awareness",
    image: "/service_3.jpg",
  },
  {
    name: "Medicine Intelligence",
    image: "/service_4.jpg",
  },
  {
    name: "Medical Waste Guidance",
    image: "/service_5.jpg",
  },
  {
    name: "Product Safety Check",
    image: "/service_6.jpg",
  },
  {
    name: "Diet & Health Tracker",
    image: "/service_1.jpg",
  },
  {
    name: "Symptom Evolution Tracker",
    image: "/service_2.jpg",
  },
  {
    name: "Jargon Translator",
    image: "/service_3.jpg",
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
            Expert AI care made simple with CuraAI
          </h2>
          <span>
            CuraAI delivers intelligent, responsive healthcare support powered
            by artificial intelligence
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
        {aiServices.map((service, idx) => (
          <div
            key={idx}
            className="relative group overflow-hidden rounded-2xl shadow-md cursor-pointer"
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white z-10">
              <h3 className="text-lg font-semibold">{service.name}</h3>
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
