import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./MiddleSection.css"; // include this for scrollbar-hide styles

export default function MiddleSection({ simpleEnglish, setData }) {
  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", content: simpleEnglish } // initial explanation
  ]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Send message function
  const sendMessage = async () => {
    if (!selectedFile && textInput.trim() === "") return;
    setSending(true);

    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await axios.post(
          // "http://localhost:4000/upload",
          "https://genaibackend.el.r.appspot.com/upload",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        const cleaned = response.data.summary.replace(/```json|```/g, "").trim();
        const jsonData = JSON.parse(cleaned);
        console.log(jsonData)

        if (jsonData) {
          setData(jsonData);
          localStorage.setItem("context", JSON.stringify(jsonData));
        }

        setSelectedFile(null); // clear file after sending
      } else {
        const query = textInput;
        setTextInput(""); // clear input immediately
        const history = JSON.parse(localStorage.getItem("chat_history")) || [];
        const context = localStorage.getItem("context") || "";

        // Add user message to chat UI
        setMessages((prev) => [...prev, { role: "human", content: query }]);

        const response = await axios.post("https://genaibackend.el.r.appspot.com/chat", {
          query,
          history,
          context,
        });

        const responseData = response.data;

        // Save updated history
        if (responseData.updatedHistory) {
          localStorage.setItem("chat_history", JSON.stringify(responseData.updatedHistory));
        }

        // Append AI response
        if (responseData.answer) {
          setMessages((prev) => [...prev, { role: "ai", content: responseData.answer }]);
        }
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    } finally {
      setSending(false);
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !sending) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg text-white h-[90vh] flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-blue-400">
        🤖 AI Document Assistant
      </h2>

      {/* Scrollable chat area */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-hide">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "human" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-lg shadow max-w-xs text-sm leading-relaxed ${
                msg.role === "human"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-800 text-gray-200 rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input + Actions */}
      <div className="flex items-center gap-2 mt-4">
        <input
          type="file"
          accept=".pdf,.doc,.docx,image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          onClick={() => fileInputRef.current.click()}
          className="bg-gray-800 px-4 py-2 rounded-md border border-gray-700 text-sm hover:bg-gray-700 transition"
        >
          Upload File
        </button>

        <input
          type="text"
          placeholder="Ask a question about the document..."
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onKeyDown={handleKeyDown} // enter to send
          className="flex-1 bg-gray-800 px-4 py-2 rounded-md border border-gray-700 text-sm focus:outline-none"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-500 transition"
          disabled={sending}
        >
          {sending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
