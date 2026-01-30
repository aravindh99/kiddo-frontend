import "./Robot.css";
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import { HiMicrophone } from "react-icons/hi";
import { FiMessageSquare, FiMic, FiSend, FiLoader } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import { askRobot } from "./Robot.js";
import aiImage from "../../../assets/images/login image 2.png";

export default function Robot() {
  const [viewMode, setViewMode] = useState("chat"); // 'chat' or 'voice'
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { id: Date.now(), text: "Hi Abi! I'm your AI learning assistant. How can I help you today?", sender: "bot" }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll logic for chat
  useEffect(() => {
    if (viewMode === "chat" && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, viewMode]);

  const handleSend = async (textOverride = null) => {
    const question = textOverride || input;
    if (!question.trim() || isLoading) return;

    // 1. Add User Message
    const userMsg = { id: Date.now(), text: question, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // 2. Call RAG API
      const response = await askRobot(question, viewMode === "voice");

      // 3. Add Bot Response
      const botMsg = {
        id: Date.now() + 1,
        text: response.answer || "I'm sorry, I couldn't process that.",
        sender: "bot"
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { id: Date.now() + 1, text: "Failure in connection. Please try again.", sender: "bot" }]);
    } finally {
      setIsLoading(false);
      setIsRecording(false);
    }
  };

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      // In a real implementation, you'd start recording here.
      // For now, we simulate a voice trigger for the API.
      setTimeout(() => {
        handleSend("Can you explain photosynthesis?"); // Simulated voice input
      }, 2000);
    } else {
      setIsRecording(false);
    }
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "chat" ? "voice" : "chat");
  };

  return (
    <div className={`robot ${viewMode}-mode`}>
      <Header />

      {/* TOP-LEFT CORNER TOGGLE BUTTON */}
      <button className="mode-toggle-btn" onClick={toggleViewMode} aria-label="Toggle View Mode">
        {viewMode === "chat" ? <FiMessageSquare /> : <FiMic />}
      </button>

      {viewMode === "chat" ? (
        <main className="robot-chat-container" ref={scrollRef}>
          <div className="chat-history">
            {messages.map((m) => (
              <div key={m.id} className={`message-bubble ${m.sender}`}>
                {m.sender === "bot" && (
                  <div className="bot-avatar-mini">
                    <img src={aiImage} alt="AI" />
                  </div>
                )}
                <div className="bubble-content">
                  <p>{m.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message-bubble bot">
                <div className="bot-avatar-mini">
                  <img src={aiImage} alt="AI" />
                </div>
                <div className="bubble-content bot-thinking">
                  <FiLoader className="animate-spin" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* COMPACT INPUT FOR CHAT MODE */}
          <div className="chat-input-bar">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button className="chat-send-btn" onClick={() => handleSend()}>
              <FiSend />
            </button>
          </div>
        </main>
      ) : (
        <main className="robot-voice-container">
          {/* 60% IMAGE SECTION */}
          <div className="voice-top-section">
            <div className="voice-ai-orb">
              <img src={aiImage} alt="AI Robot" className={isRecording || isLoading ? "pulse-ai" : ""} />
            </div>
            {isLoading && <p className="voice-ai-status">Processing...</p>}
          </div>

          {/* 40% MIC SECTION */}
          <div className="voice-bottom-section">
            <div className={`voice-interaction-circle ${isRecording ? "active" : ""}`}>
              <div className="recording-waves">
                {isRecording && (
                  <>
                    <span className="wave"></span>
                    <span className="wave"></span>
                    <span className="wave"></span>
                    <span className="wave"></span>
                    <span className="wave"></span>
                  </>
                )}
              </div>

              <button
                className={`elite-mic-btn ${isRecording ? "recording" : ""} ${isLoading ? "loading" : ""}`}
                onClick={toggleRecording}
                disabled={isLoading}
              >
                {isLoading ? <FiLoader className="animate-spin" /> : <HiMicrophone />}
              </button>

              <span className="voice-tip">
                {isLoading ? "Analyzing..." : isRecording ? "Listening..." : "Speak now"}
              </span>
            </div>
          </div>
        </main>
      )}

      <Footer />
    </div>
  );
}
