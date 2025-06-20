import React, { useState, useEffect } from "react";

const AIService = () => {
  const [diseaseData, setDiseaseData] = useState({});
  const [selectedDisease, setSelectedDisease] = useState("");
  const [formValues, setFormValues] = useState({});
  const [notes, setNotes] = useState("");
  const [aiResponse, setAiResponse] = useState(null);

  useEffect(() => {
    const fetchDiseaseData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/ai/diseases");
        const json = await response.json();
        setDiseaseData(json.data);
      } catch (error) {
        console.error("Error fetching disease options", error);
      }
    };

    fetchDiseaseData();
  }, []);

  const handleDiseaseChange = (e) => {
    const disease = e.target.value;
    setSelectedDisease(disease);

    const initialFields = {};
    diseaseData[disease]?.forEach((item) => {
      initialFields[item.field] = item.type === "boolean" ? false : "";
    });
    setFormValues(initialFields);
    setAiResponse(null);
  };

  const handleInputChange = (field, type, e) => {
    let value = e;
    if (type === "boolean") {
      value = e.target.checked;
    } else if (type === "file") {
      value = e.target.files[0];
    } else {
      value = e.target.value;
    }

    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fields = diseaseData[selectedDisease] || [];

    const userFields = {};
    fields.forEach(({ field, description }) => {
      const label = description || field;
      userFields[label] = formValues[field];
    });

    if (notes.trim()) {
      userFields["Additional Notes"] = notes;
    }

    const payload = {
      diseaseName: selectedDisease,
      userFields,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/ai/personalised_summary",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      setAiResponse({
        heading: `AI Assistance: ${selectedDisease}`,
        content: result.response,
      });
    } catch (error) {
      console.error("Error submitting to AI service", error);
      setAiResponse({
        heading: `AI Assistance: ${selectedDisease}`,
        content: "There was an error fetching the AI response.",
      });
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
              Select Disease <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={selectedDisease}
              onChange={handleDiseaseChange}
              className="w-full border rounded-lg p-2 text-sm"
            >
              <option value="">Select</option>
              {Object.keys(diseaseData).map((disease) => (
                <option key={disease} value={disease}>
                  {disease}
                </option>
              ))}
            </select>
          </div>

          {selectedDisease &&
            diseaseData[selectedDisease]?.map(
              ({ field, type, inputType, description, options }) => (
                <div key={field} className="mb-4">
                  <label className="block font-medium">{field}</label>
                  <p className="text-xs text-gray-500 mb-1">{description}</p>
                  {inputType === "text" && (
                    <input
                      type="text"
                      className="w-full border p-2 rounded"
                      value={formValues[field]}
                      onChange={(e) => handleInputChange(field, type, e)}
                    />
                  )}
                  {inputType === "textarea" && (
                    <textarea
                      className="w-full border p-2 rounded"
                      value={formValues[field]}
                      onChange={(e) => handleInputChange(field, type, e)}
                    />
                  )}{" "}
                  {inputType === "dropdown" && (
                    <select
                      className="w-full border p-2 rounded"
                      value={formValues[field]}
                      onChange={(e) => handleInputChange(field, type, e)}
                    >
                      <option value="">Select</option>
                      {options.map((opt, idx) => (
                        <option key={idx} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}
                  {inputType === "checkbox" && (
                    <div className="mt-1">
                      <input
                        type="checkbox"
                        checked={formValues[field] || false}
                        onChange={(e) => handleInputChange(field, type, e)}
                      />{" "}
                      <span className="text-sm">Yes</span>
                    </div>
                  )}
                  {inputType === "file" && (
                    <input
                      type="file"
                      className="w-full"
                      onChange={(e) => handleInputChange(field, type, e)}
                    />
                  )}
                </div>
              )
            )}

          {selectedDisease && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Additional Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Optional notes or context"
                className="w-full border rounded-lg p-3 text-sm"
                rows={3}
              />
            </div>
          )}

          {selectedDisease && (
            <button
              type="submit"
              className="self-start bg-[#057c8b] hover:bg-[#04606e] text-white px-6 py-2 rounded-full text-sm font-medium transition"
            >
              Submit for AI Assistance
            </button>
          )}
        </form>

        {aiResponse && (
          <div className="mt-6 p-4 bg-[#e8f8f9] border border-[#057c8b] rounded-lg shadow">
            <h3 className="font-bold text-[#057c8b] mb-2">
              {aiResponse.heading}
            </h3>
            <div className="text-sm text-gray-700 whitespace-pre-wrap">
              <div dangerouslySetInnerHTML={{ __html: aiResponse.content }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIService;
