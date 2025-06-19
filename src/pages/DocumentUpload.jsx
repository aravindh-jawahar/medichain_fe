import React, { useState } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";

const TABS = [
  "All",
  "Prescriptions",
  "Lab Reports",
  "Scan Reports",
  "Analysis Reports",
  "Discharge Summaries",
  "Medical Bills",
  "Treatment Plans",
  "Doctor Notes",
];

const DocumentUpload = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [documents, setDocuments] = useState([]);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const category = e.target.dataset.category;

    const newDocs = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type,
      category,
    }));

    setDocuments((prev) => [...prev, ...newDocs]);
    toast.success(`${files.length} file(s) uploaded to ${category}`);
  };

  const handleDelete = (docToDelete) => {
    setDocuments((prev) => prev.filter((doc) => doc.url !== docToDelete.url));
    URL.revokeObjectURL(docToDelete.url);
    toast.success(`Deleted ${docToDelete.name}`);
  };

  const filteredDocs =
    activeTab === "All"
      ? documents
      : documents.filter((doc) => doc.category === activeTab);

  return (
    <div className="min-h-screen pt-24 px-4 md:px-12 bg-gray-50 text-gray-800">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#057c8b] text-center">
        Upload Your Medical Documents
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        {TABS.filter((tab) => tab !== "All").map((category) => (
          <label
            key={category}
            className="border border-dashed border-[#057c8b] p-4 rounded-md cursor-pointer text-center hover:bg-[#e5f5f6] transition"
          >
            <p className="font-medium text-sm text-[#057c8b] mb-1">
              Upload {category}
            </p>
            <input
              type="file"
              data-category={category}
              multiple
              accept="image/*,.pdf"
              className="hidden"
              onChange={handleUpload}
            />
          </label>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
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

      {filteredDocs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredDocs.map((doc, index) => (
            <div
              key={index}
              className="bg-white relative rounded-md shadow-sm p-4 border border-gray-200 mb-5"
            >
              <p className="text-sm font-medium text-[#057c8b] mb-2">
                {doc.name}
              </p>
              {doc.type.includes("image") ? (
                <img
                  src={doc.url}
                  alt={doc.name}
                  className="w-full h-48 object-cover rounded"
                />
              ) : (
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm"
                >
                  View PDF
                </a>
              )}
              <p className="text-xs text-gray-500 mt-2">{doc.category}</p>

              <X
                onClick={() => handleDelete(doc)}
                className="absolute top-2 right-2 text-sm size-5 text-red-500"
                title="Delete"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No documents uploaded yet.
        </p>
      )}
    </div>
  );
};

export default DocumentUpload;
