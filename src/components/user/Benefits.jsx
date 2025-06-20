import React from "react";
import { useNavigate } from "react-router";

import {
  HeartHandshake,
  Microscope,
  Plus,
  Activity,
  ArrowRight,
} from "lucide-react";

const benefits = [
  {
    title: "Support & care",
    description:
      "Personalized healthcare services delivered with empathy & dedication",
    icon: <HeartHandshake className="text-white" />,
  },
  {
    title: "Cutting-edge innovation",
    description: "Advanced treatments powered by modern technology and experts",
    icon: <Microscope className="text-white" />,
  },
  {
    title: "Reliable expertise",
    description:
      "Work with qualified specialists who understand your healthcare",
    icon: <Plus className="text-white" />,
  },
  {
    title: "Seamless support",
    description:
      "First visit to follow-up care, we make every step smooth and stress-free",
    icon: <Activity className="text-white" />,
  },
];

const Benefits = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/ai-service");
  };
  return (
    <section className="py-5 md:py-20 bg-white text-gray-800 max-w-7xl !px-5">
      <div className="text-center mb-14 flex flex-col !gap-4">
        <span className="text-6xl font-extrabold !text-[#057c8b] text-center px-6 py-2">
          Benefits
        </span>

        <h2 className="text-2xl sm:text-3xl font-bold max-w-3xl mx-auto">
          Grow with healthcare support shaped by trust & care
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:col-span-2">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
            >
              <div className="w-10 h-10 bg-[#057c8b] flex items-center justify-center rounded-lg shadow">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#057c8b] text-white rounded-2xl p-8 flex flex-col justify-between">
          <div>
            <div
              onClick={handleNavigate}
              className="w-10 h-10 !bg-white cursor-pointer flex items-center justify-center rounded-full mb-4"
            >
              <ArrowRight className="text-[#057c8b]" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">
              Ready for better care?
            </h3>
            <p className="text-sm text-white/80">
              Our commitment to innovation drives better outcomes for every
              patient
            </p>
          </div>
          <div className="mt-8">
            <img
              src="/care_and_support.jpg"
              alt="Doctor on phone"
              className="rounded-xl w-full max-w-xs mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
