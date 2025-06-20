import React from "react";
import { useNavigate } from "react-router";

import {
  HeartHandshake,
  Microscope,
  Plus,
  Activity,
  Bot,
  PhoneCall,
  Users,
  ArrowRight,
  PackageCheck,
  Trash2,
  FileBarChart2,
} from "lucide-react";

const benefits = [
  {
    title: "AI Medical Assistance",
    description: "Instant support via AI prompts for fast and reliable help",
    icon: <Bot className="text-white" />,
  },
  {
    title: "24/7 Consultation",
    description:
      "Talk to doctors anytime via chat, call, or face-to-face support",
    icon: <PhoneCall className="text-white" />,
  },
  {
    title: "Doorstep Services",
    description:
      "Medicines delivered and medical waste safely disposed at home",
    icon: <PackageCheck className="text-white" />,
  },
  {
    title: "Medical Waste Management",
    description:
      "Safe disposal of used utensils and medical garbage collection",
    icon: <Trash2 className="text-white" />,
  },
  {
    title: "Past Health Record Insights",
    description: "Analyze your past medical history to aid better diagnosis",
    icon: <FileBarChart2 className="text-white" />,
  },
  {
    title: "Geo-based Expert Locator",
    description:
      "Easily find nearby doctors, professionals, and waste collectors",
    icon: <Users className="text-white" />,
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
          Grow with AI-driven healthcare rooted in trust, care, and continuous
          support.
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
