import React, { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";

const initialMessages = [
  { id: 1, sender: "bot", text: "Hi! How can I help you today?" },
];

const App = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [socket, setSocket] = useState(null);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    const socketInstance = io("localhost:3000");
    setSocket(socketInstance);

    socketInstance.on("ai-response-listener", (res) => {
      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: res.answer,
      };

      setMessages((prev) => [...prev, botMessage]);
      console.log(messages);
    });
  }, []);
  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: messages.length + 1,
      sender: "user",
      text: input,
    };
    setMessages([...messages, newMsg]);

    socket.emit("ai-message", {
      input,
    });
    setInput("");
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e6e6e6] to-[#d1d1d1] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden border border-gray-300 h-[600px]">
        {/* Header */}
        <div className="p-3 border-b border-gray-300 bg-[#f0f0f0] flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#34b7f1] to-[#34b7f1] flex items-center justify-center mr-2">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-800">
              chat bot
            </h1>
            <p className="text-xs text-gray-500">last seen recently</p>
          </div>
          <div className="flex space-x-3">
            <button className="text-gray-500 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div
          className="flex-1 p-3 space-y-1 overflow-y-auto bg-[#e0e0e0]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E\")",
          }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`relative px-4 py-2 rounded-xl max-w-xs shadow-sm ${
                  msg.sender === "user"
                    ? "bg-[#e3f2fd] rounded-br-none"
                    : "bg-white rounded-bl-none"
                }`}
                style={{
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                }}
              >
                {msg.text}
                {/* Message time */}
                <span
                  className={`text-xs opacity-60 block text-right mt-1 ${
                    msg.sender === "user" ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  12:34
                </span>

                {/* Message tail for user messages */}
                {msg.sender === "user" && (
                  <div className="absolute right-0 bottom-0 w-3 h-3 overflow-hidden">
                    <div className="w-3 h-3 bg-[#e3f2fd] transform rotate-45 translate-x-1/2 translate-y-1/2"></div>
                  </div>
                )}

                {/* Message tail for bot messages */}
                {msg.sender === "bot" && (
                  <div className="absolute left-0 bottom-0 w-3 h-3 overflow-hidden">
                    <div className="w-3 h-3 bg-white transform rotate-45 -translate-x-1/2 translate-y-1/2"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-gray-300 bg-[#f0f0f0]">
          <div className="flex gap-2 items-center">
            <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-300 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-300 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <input
              type="text"
              className="flex-1 px-4 py-2 rounded-full bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              autoFocus
            />
            <button
              className="p-2 rounded-full bg-[#34b7f1] text-white hover:bg-[#2aa0d8] transition disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSend}
              disabled={!input.trim()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
