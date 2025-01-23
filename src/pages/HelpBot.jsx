import React, { useRef, useState } from "react";
import '../styles/app.css';
import "../styles/chatbot.css"; 
import { GoogleGenerativeAI } from "@google/generative-ai";
import Markdown from 'react-markdown'

const HelpBot = () => {
  const chatBoxRef = useRef(null);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const genAI = new GoogleGenerativeAI(geminiApiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  const addMessage = (message, sender) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, sender },
    ]);
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };
  const sendQuery = async (query) => {
    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [
              {
                text: "You are Ramesh, an assistant for our website called FarmEdge. Interact with the user and give simple minimalistic solutions and answers to the question and try to use Kannada a little while greeting the users and provide information about anything related to agriculture and farming practices. If they ask about the website, guide them through the sections. If the input is out of context, then convey to the user that you don't have information regarding this and ask them to solve only agriculture and farming-related concerns. After the interaction is done, greet the users with thanks for contacting us and if possible, try to greet in Kannada language. Whatever the farmer's first input might be, begin with greeting and telling about our website in 1 or 2 lines and ask about their concerns. Answer according to user input anything related to agriculture and farming practices, ask questions about what they specifically want to know about and solve their issues by providing information and resources in simple words.",
              },
            ],
          },
          {
            role: "model",
            parts: [
              {
                text: "ನಮಸ್ಕಾರ! (Namaste!) Welcome to FarmEdge, FarmEdge provides real-time data and resources for farmers. I'm Ramesh, and I'll be assisting you today. How can I help you?",
              },
            ],
          },
          {
            role: "user",
            parts: [
              {text: "give structured output to the users whenever they ask something also provide weather information and other information regarding agriculture"},
            ],
          },
          {
            role: "model",
            parts: [
              {text: "ಸರಿ (Saari), I understand.  Let's organize the information you need. To best help you, please tell me specifically what you want to know. For example:\n\n* **Specific Crop Information:** What crop are you interested in? (e.g., rice, wheat, cotton, etc.)  What aspects of growing that crop are you curious about? (e.g., planting, irrigation, pest control, harvesting, etc.)\n* **Livestock:** What kind of livestock do you raise? (e.g., cows, goats, chickens, etc.) What are your concerns regarding their care or management?\n* **Weather:** What is your location? I can then provide you with a current weather forecast and any relevant alerts.  Are you interested in a short-term (a few days) or long-term forecast?  Are you looking for historical weather data?\n* **Sustainable Farming Practices:**  What specific sustainable practices are you interested in learning more about? (e.g., crop rotation, cover cropping, organic farming, etc.)\n* **Government Schemes/Support:** Are you looking for information on any government schemes or financial support for farmers in your region? (Please specify your region)\n\n\nOnce I have a clearer idea of what you need, I can provide you with structured, easy-to-understand information.  I can also provide links to relevant resources if needed.\n"},
            ],
          },
          {
            role: "user",
            parts: [
              {text: "in the complete entire chat be responsive to the user and analyze the previous questions and remember all the inputs that user has asked and answer according to that and consider previous interactions also while giving responses and answer questions simultaneously analyzing the inputs"},
            ],
          },
          {
            role: "model",
            parts: [
              {text: "ನಮಸ್ಕಾರ! (Namaste!) Welcome back to FarmEdge. I remember our last conversation.  To help me answer your questions accurately and efficiently, please tell me what you would like to discuss today.  I can access information on various aspects of agriculture, including specific crops, livestock, weather forecasts, sustainable farming practices, and government schemes.  Let me know your specific concerns so I can provide you with the most relevant information.\n"},
            ],
          },
          {
            role: "user",
            parts: [
              {text: "also give structured outputs don't use unwanted characters in the chat it should be only in text numbers and necessary characters format"},
            ],
          },
          {
            role: "model",
            parts: [
              {text: "ನಮಸ್ಕಾರ! (Namaste!)  I'm ready to help you again. Please ask your questions about agriculture, livestock, weather, or sustainable farming practices.  I will structure my responses clearly and use only necessary characters.  I will also remember our past conversations to give you the most relevant information.\n"},
            ],
          },
          {
            role: "user",
            parts: [
              {text: "but use Kannada language for greeting and other purpose as much as possible and intoduce yourself in the beginning and then ask concern\n"},
            ],
          },
          {
            role: "model",
            parts: [
              {text: "ನಮಸ್ಕಾರ! (Namaste!)  I am Ramesh, your assistant at FarmEdge.  What agricultural concerns can I help you with today?\n"},
            ],
          },
        ],
      });

      const result = await chatSession.sendMessage(query);
      const responseText = result.response.text();
      addMessage(responseText, "bot");
    } catch (error) {
      console.error("Error generating content:", error);
      addMessage("Sorry, I couldn't generate a response.", "bot");
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
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <main>
      <div className="chat-container">
        <div ref={chatBoxRef} className="chat-box">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-bubble ${msg.sender}-message`}>
              <Markdown>{msg.text}</Markdown>
              <span className="message-timestamp">{new Date().toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your query here..."
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </main>
  );
};

export default HelpBot;