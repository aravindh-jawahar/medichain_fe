import React from "react";

const mockRecords = [
  {
    date: "2024-03-14",
    type: "Blood Test",
    summary: "Normal levels of hemoglobin and platelets.",
  },
  {
    date: "2024-01-28",
    type: "MRI Scan",
    summary: "No abnormalities found in brain scan.",
  },
  {
    date: "2023-11-10",
    type: "Consultation",
    summary: "Routine check-up. Prescribed vitamin D supplements.",
  },
  {
    date: "2024-01-28",
    type: "MRI Scan",
    summary: "No abnormalities found in brain scan.",
  },
  {
    date: "2023-11-10",
    type: "Consultation",
    summary: "Routine check-up. Prescribed vitamin D supplements.",
  },
];

export default function MedicalRecords() {
  return (
    <div className="min-h-screen pt-24 px-4 md:px-12 bg-gray-50 text-gray-800">
      <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row gap-10 justify-between">
        {/* Records */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#057c8b]">
            Past Medical Records
          </h2>

          <div className="space-y-4 h-auto lg:h-[500px] overflow-hidden lg:hover:overflow-y-auto pr-2 scroll-hide">
            {mockRecords.map((record, index) => (
              <div
                key={index}
                className="bg-white shadow-sm rounded-lg p-5 border-l-4 border-[#057c8b] transition hover:shadow-md"
              >
                <div className="text-sm text-gray-500">{record.date}</div>
                <div className="text-lg font-semibold text-[#057c8b]">
                  {record.type}
                </div>
                <p className="text-gray-700 mt-1">{record.summary}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="w-full lg:w-1/2 flex justify-center items-center lg:min-h-[500px]">
          <img
            src="/patient_dummy.jpeg"
            alt="Patient"
            className="rounded-xl shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm object-cover"
          />
        </div>
      </div>
    </div>
  );
}
