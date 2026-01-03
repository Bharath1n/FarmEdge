import { useRef, useState, useEffect } from "react";
import Markdown from 'react-markdown';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { useAuth } from "@clerk/clerk-react";

const HelpBot = () => {
  const chatBoxRef = useRef(null);
  const { getToken } = useAuth();
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  useEffect(() => {
    // Add welcome message on component mount
    const welcomeMessage = {
      text: "ನಮಸ್ಕಾರ! (Namaste!) Welcome to FarmEdge, FarmEdge provides real-time data and resources for farmers. I'm Ramesh, and I'll be assisting you today. How can I help you?",
      sender: "bot",
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (message, sender) => {
    const newMessage = {
      text: message,
      sender,
      timestamp: new Date()
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

const sendQuery = async (query) => {
  setIsTyping(true);
  try {
    const token = await getToken();

const res = await fetch("http://localhost:5001/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ message: query }),
});

    const data = await res.json();
    setIsTyping(false);
    addMessage(data?.reply || "Sorry, I couldn't generate a response.", "bot");
  } catch (err) {
    setIsTyping(false);
    addMessage(
      "ಕ್ಷಮಿಸಿ (Sorry), ಉತ್ತರವನ್ನು ತಯಾರಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
      "bot"
    );
  }
};

  const handleSend = () => {
    const query = userInput.trim();
    if (query) {
      addMessage(query, "user");
      sendQuery(query);
      setUserInput("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-8 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6 animate-fadeIn">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">AI-Powered Agriculture Assistant</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Meet Ramesh</h1>
          <p className="text-gray-600">Your FarmEdge AI assistant for all agriculture queries</p>
        </div>
      </div>

      {/* Chat Container */}
      <main className="max-w-4xl mx-auto animate-slideUp">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-green-100">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Bot className="w-8 h-8 text-green-600" />
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Ramesh</h2>
                <p className="text-green-100 text-sm">Online • Ready to help</p>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div 
            ref={chatBoxRef} 
            className="h-[60vh] overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white space-y-4"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"} animate-messageSlide`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Avatar */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                  msg.sender === "user" 
                    ? "bg-gradient-to-br from-blue-500 to-cyan-500" 
                    : "bg-gradient-to-br from-green-500 to-emerald-500"
                }`}>
                  {msg.sender === "user" ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`flex flex-col max-w-[70%] ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`px-5 py-3 rounded-2xl shadow-md ${
                      msg.sender === "user"
                        ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-tr-none"
                        : "bg-white border border-gray-200 text-gray-800 rounded-tl-none"
                    }`}
                  >
                    <Markdown className="prose prose-sm max-w-none">{msg.text}</Markdown>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 px-2">
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 animate-messageSlide">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-md">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white border border-gray-200 px-5 py-3 rounded-2xl rounded-tl-none shadow-md">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex items-end gap-3">
              <div className="flex-1 relative">
                <textarea
                  className="w-full px-5 py-4 pr-12 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none bg-white shadow-sm"
                  placeholder="Type your agriculture query here..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows="1"
                  style={{ minHeight: "56px", maxHeight: "120px" }}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!userInput.trim() || isTyping}
                className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {isTyping ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <Send className="w-6 h-6" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Press <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Enter</kbd> to send • <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Shift + Enter</kbd> for new line
            </p>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn" style={{ animationDelay: "0.3s" }}>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-gray-800 mb-2">🌾 Crop Guidance</h3>
            <p className="text-sm text-gray-600">Get expert advice on planting, irrigation, and harvesting</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-gray-800 mb-2">🌤️ Weather Info</h3>
            <p className="text-sm text-gray-600">Ask about weather forecasts and climate patterns</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-gray-800 mb-2">🐄 Livestock Care</h3>
            <p className="text-sm text-gray-600">Learn about animal husbandry and health management</p>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes messageSlide {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out both;
        }
        
        .animate-slideUp {
          animation: slideUp 0.6s ease-out both;
        }
        
        .animate-messageSlide {
          animation: messageSlide 0.3s ease-out both;
        }
        
        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #10b981;
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #059669;
        }

        /* Markdown styling */
        .prose {
          color: inherit;
        }
        
        .prose strong {
          color: inherit;
          font-weight: 600;
        }
        
        .prose ul, .prose ol {
          margin: 0.5rem 0;
        }
        
        .prose li {
          margin: 0.25rem 0;
        }
        
        kbd {
          font-family: monospace;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default HelpBot;

console.log("Chatbot component loaded");