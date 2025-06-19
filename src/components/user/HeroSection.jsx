import React from "react";

import { useNavigate } from "react-router-dom";

import { ArrowRight, Star, Users } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/specialities");
  };
  return (
    <div className="bg-gradient-to-b from-[#fff] to-[#fff0] max-w-7xl h-full flex flex-col lg:flex-row items-center justify-between px-6 !py-25 gap-10">
      <div className="flex-1">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex -space-x-3">
            {[
              "/avatar_1.jpg",
              "/avatar_5.jpg",
              "/avatar_3.jpg",
              "/avatar_4.jpg",
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`user-${i}`}
                className="size-10 rounded-full border-2 border-white"
              />
            ))}
            <div className="size-10 rounded-full bg-[#057c8b] text-white text-sm flex items-center justify-center border-2 border-white">
              +
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Star className="text-yellow-400 fill-yellow-400 w-4 h-4" />
            <Star className="text-yellow-400 fill-yellow-400 w-4 h-4" />
            <Star className="text-yellow-400 fill-yellow-400 w-4 h-4" />
            <Star className="text-yellow-400 fill-yellow-400 w-4 h-4" />
            <Star className="text-yellow-400 fill-yellow-400 w-4 h-4" />
            <span className="font-medium">Based on 20K+ Reviews</span>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="!text-3xl md:!text-5xl font-bold mb-4 text-gray-900">
          Search any Medical specialist & get service to your doorstep
        </h1>

        {/* Subheading */}
        <p className="text-gray-600 mb-6">
          Experience leading healthcare services with expert treatments tailored
          to your work needs
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={handleNavigate}
            className="!bg-[#057c8b] !text-white px-6 py-2 !rounded-full text-sm shadow hover:!bg-[#04606e] transition"
          >
            Look for our specialists
            <ArrowRight className="inline-block w-4 h-4 ml-1" />
          </button>
        </div>

        {/* Badges */}
        <div className="flex gap-10 mt-2">
          <div className="flex items-center gap-2">
            <Users className="text-[#057c8b] size-10" />
            <div>
              <p className="text-sm font-semibold text-gray-800">Support</p>
              <p className="text-xs text-gray-500">24/7 care access</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Star className="text-[#057c8b] size-10" />
            <div>
              <p className="text-sm font-semibold text-gray-800">Rating</p>
              <p className="text-xs text-gray-500">Rated 5 stars by users</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-md">
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          <img
            src="/cover_doctor.jpg"
            alt="Dr. James Carter"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent text-white p-4">
            <p className="text-sm">Neurologist</p>
            <h3 className="text-lg font-bold">James Carter</h3>
          </div>
          <button
            onClick={handleNavigate}
            className="absolute bottom-4 !right-3 !p-3 !bg-[#057c8b] text-white !rounded-full shadow hover:bg-[#04606e]"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
