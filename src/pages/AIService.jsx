import React, { useState } from "react";
import {
  illnessOptions,
  firstAidOptions,
  fitnessOptions,
  dietaryOptions,
} from "../components/lib/constants/AiMock";

const AIService = () => {
  const [type, setType] = useState("");
  const [concern, setConcern] = useState("");
  const [notes, setNotes] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setType(selectedType);
    setConcern("");
    setShowNotes(false);
    setNotes("");
  };

  const handleConcernChange = (e) => {
    const value = e.target.value;
    setConcern(value);
    setShowNotes(value === "Others");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // const payload = {
    //   type,
    //   concern,
    //   notes: showNotes ? notes : "",
    // };

    // Simulate AI response
    setAiResponse({
      heading: `AI Assistance: ${type}`,
      content: `You selected "${concern}"${
        showNotes ? ` with notes: "${notes}"` : ""
      }. An AI-generated recommendation or insight will be provided here.`,
    });
  };

  const getOptions = () => {
    switch (type) {
      case "Illness":
        return illnessOptions;
      case "First aid":
        return firstAidOptions;
      case "Fitness":
        return fitnessOptions;
      case "Dietary":
        return dietaryOptions;
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen pt-24 px-6 bg-gray-50 text-gray-800">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-[#057c8b] mb-6">
          AI Medical Assistance
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Type of Assistance <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={type}
              onChange={handleTypeChange}
              className="w-full border rounded-lg p-2 text-sm"
            >
              <option value="">Select</option>
              <option value="Illness">Illness</option>
              <option value="First aid">First aid</option>
              <option value="Pharmaceutical">Pharmaceutical</option>
              <option value="Fitness">Fitness</option>
              <option value="Dietary">Dietary</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {type && type !== "Pharmaceutical" && type !== "Others" && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Concern <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={concern}
                onChange={handleConcernChange}
                className="w-full border rounded-lg p-2 text-sm"
              >
                <option value="">Select</option>
                {getOptions().map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          )}

          {type === "Pharmaceutical" && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Enter Medicine Name <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                value={concern}
                onChange={(e) => setConcern(e.target.value)}
                placeholder="e.g. Paracetamol"
                className="w-full border rounded-lg p-2 text-sm"
              />
            </div>
          )}

          {type === "Others" && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Describe your concern <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                value={concern}
                onChange={(e) => setConcern(e.target.value)}
                placeholder="Describe the medical issue or question..."
                className="w-full border rounded-lg p-3 text-sm"
                rows={4}
              />
            </div>
          )}

          {showNotes && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Additional Notes (optional but recommended)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Share any symptoms, duration, history etc."
                className="w-full border rounded-lg p-3 text-sm"
                rows={3}
              />
            </div>
          )}

          <button
            type="submit"
            className="self-start !bg-[#057c8b] hover:!bg-[#04606e] text-white px-6 py-2 !rounded-full text-sm font-medium transition"
          >
            Submit for AI Assistance
          </button>
        </form>

        {aiResponse && (
          <div className="mt-6 p-4 bg-[#e8f8f9] border border-[#057c8b] rounded-lg shadow">
            <h3 className="font-bold text-[#057c8b] mb-2">
              {aiResponse.heading}
            </h3>
            <p className="text-sm text-gray-700">{aiResponse.content}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIService;
