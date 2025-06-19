import React from "react";
import { useState } from "react";
import {
  doctors,
  nurses,
  caretakers,
  babysitters,
} from "../components/lib/constants/SpecialitiesMock";

import { toast } from "sonner";

const TABS = ["Doctors", "Nurses", "Caretakers", "Babysitters"];

const Specialities = () => {
  const [activeTab, setActiveTab] = useState("Doctors");

  const dataMap = {
    Doctors: { list: doctors, type: "doctor" },
    Nurses: { list: nurses, type: "nurse" },
    Caretakers: { list: caretakers, type: "caretaker" },
    Babysitters: { list: babysitters, type: "babysitter" },
  };

  const { list, type } = dataMap[activeTab];

  const renderCard = (person, index) => (
    <div
      key={person.name + index}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition flex flex-col"
    >
      <img
        src={person.image}
        alt={person.name}
        className="w-full h-52 object-cover"
      />
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-[#057c8b]">{person.name}</h3>

        {type === "doctor" && (
          <p className="text-sm text-gray-600">
            Speciality: {person.speciality}
          </p>
        )}
        {type === "nurse" && (
          <p className="text-sm text-gray-600">Expertise: {person.expertise}</p>
        )}
        {(type === "caretaker" || type === "babysitter") && (
          <p className="text-sm text-gray-600">{person.role}</p>
        )}

        <p className="text-sm text-gray-500 mb-4">
          Experience: {person.experience}
        </p>

        <div className="mt-auto flex flex-col gap-2">
          <button
            onClick={() =>
              toast.success(
                type === "doctor"
                  ? `Successfully requested appointment with ${person.name}`
                  : type === "nurse"
                  ? `Successfully requested homecare aid from ${person.name}`
                  : `Successfully requested caretaking from ${person.name}`
              )
            }
            className="!bg-[#057c8b] !text-white text-sm py-2 px-4 !rounded-full !hover:bg-[#04606e]"
          >
            {type === "doctor"
              ? "Book Appointment"
              : type === "nurse"
              ? "Homecare Aid"
              : "Request Caretaking"}
          </button>

          <button className="!bg-white !border !border-[#057c8b] text-[#057c8b] text-sm py-2 px-4 !rounded-full hover:!bg-[#e5f5f6] transition">
            Consult {person.name}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 px-4 md:px-12 bg-gray-50 text-gray-800">
      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 !rounded-full text-sm font-medium border transition ${
              activeTab === tab
                ? "!bg-[#057c8b] text-white !border-[#057c8b]"
                : "!bg-white !text-[#057c8b] !border-gray-300 hover:!bg-[#e5f5f6]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {list.map((person, index) => renderCard(person, index))}
      </div>
    </div>
  );
};
export default Specialities;
