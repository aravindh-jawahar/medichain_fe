import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { SendHorizonal, Paperclip } from "lucide-react";

const Chat = () => {
  const { name } = useParams();

  const [messages, setMessages] = useState([
    { from: "them", text: `Hi, this is ${name}. How can I help you today?` },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "me", text: input }]);
    setInput("");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMessages((prev) => [
        ...prev,
        {
          from: "me",
          text: `📎 Uploaded: ${file.name}`,
          file,
        },
      ]);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 md:px-12 bg-gray-50 text-gray-800 bg-[url('/chat_cover_1.avif')] bg-cover bg-center bg-no-repeat">
      <div className="backdrop-blur-sm bg-white/20 border border-white/30 max-w-2xl rounded-xl mx-auto shadow-lg p-6 flex flex-col h-[70vh]">
        <h2 className="text-xl text-white font-semibold mb-4 border-b pb-2">
          Chat with {name}
        </h2>

        <div className="flex-1 overflow-y-auto space-y-4 mb-4 px-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`w-fit max-w-[80%] px-4 py-2 rounded-lg text-sm ${
                msg.from === "me"
                  ? "bg-[#057c8b] text-white self-end ml-auto"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.file ? (
                msg.file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(msg.file)}
                    alt={msg.file.name}
                    className="max-w-[200px] rounded-lg"
                  />
                ) : (
                  <a
                    href={URL.createObjectURL(msg.file)}
                    download={msg.file.name}
                    className="underline !text-white hover:!text-gray-300"
                  >
                    📎 {msg.file.name}
                  </a>
                )
              ) : (
                msg.text
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 border rounded-full min-w-20 px-4 py-2 text-sm bg-white/70 backdrop-blur placeholder:text-gray-500"
            placeholder="Type your message..."
          />

          <label className="bg-white/60 hover:bg-white/80 text-gray-700 p-2 text-sm rounded-full cursor-pointer transition whitespace-nowrap">
            <Paperclip className="size-6" />
            <input type="file" onChange={handleFileUpload} className="hidden" />
          </label>

          <button
            onClick={sendMessage}
            className="!bg-[#057c8b] flex gap-2 text-white px-4 py-2 text-sm !rounded-full"
          >
            <span className="hidden sm:block">Send</span>
            <SendHorizonal size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
