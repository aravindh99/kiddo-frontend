import { useEffect, useRef, useState } from "react";
import "./Class.css";
import { Mic, Send, ChevronLeft, Info, Image as ImageIcon, Loader2, Plus, Paperclip } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import { fetchGroupChats, fetchChatMessages } from "./Class.js";

const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const SOCKET_URL = VITE_API_URL.replace("/api", "");
const API_URL = SOCKET_URL;

export default function Class() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [chatInfo, setChatInfo] = useState(null);
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const bottomRef = useRef(null);
  const fileRef = useRef(null);

  // 1. Initial Load: Fetch User and Chat Info
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        setUser(userData);

        const chats = await fetchGroupChats();
        if (chats && chats.length > 0) {
          const mainChat = chats[0];
          setChatInfo(mainChat);

          const history = await fetchChatMessages(mainChat.chatId);
          setMessages(history.map(msg => ({
            id: msg.id,
            from: msg.sender?.role === "teacher" ? "teacher" : "student",
            name: msg.sender?.name,
            text: msg.message_text,
            imageUrl: msg.image_url,
            time: new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            senderId: msg.sender_user_id
          })));
        }
      } catch (err) {
        console.error("Failed to initialize class chat:", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // 2. Socket Connection
  useEffect(() => {
    if (!chatInfo) return;

    const token = localStorage.getItem("token");
    const s = io(SOCKET_URL, {
      auth: { token }
    });

    s.emit("group:join", { chatId: chatInfo.chatId });

    s.on("group:message:new", (newMsg) => {
      setMessages((prev) => [
        ...prev,
        {
          id: newMsg.id,
          from: newMsg.senderRole === "teacher" ? "teacher" : "student",
          name: newMsg.senderName,
          text: newMsg.text,
          imageUrl: newMsg.imageUrl,
          time: new Date(newMsg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          senderId: newMsg.senderUserId
        }
      ]);
    });

    setSocket(s);

    return () => s.disconnect();
  }, [chatInfo]);

  /* AUTO SCROLL TO BOTTOM */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text, imageUrl = null) => {
    if ((!text?.trim() && !imageUrl) || !socket || !chatInfo) return;

    socket.emit("group:message", {
      chatId: chatInfo.chatId,
      type: imageUrl ? "image" : "text",
      text: text,
      imageUrl: imageUrl
    });

    setInput("");
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !chatInfo) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: formData
      });

      const data = await response.json();
      if (data.url) {
        sendMessage(null, data.url);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const toggleRecording = () => {
    // Placeholder for actual recording logic
    setIsRecording(!isRecording);
    if (!isRecording) {
      alert("Recording started... (Integration pending)");
    } else {
      alert("Recording stopped. Voice message sent! (Integration pending)");
    }
  };

  return (
    <div className="chat-container">
      <Header />

      {loading ? (
        <div className="chat-loading">
          <Loader2 className="animate-spin" size={32} />
          <p>Connecting to Class GroupChat...</p>
        </div>
      ) : !chatInfo ? (
        <div className="chat-error">
          <p>No active class groupchat found.</p>
        </div>
      ) : (
        <div className="chat-interface">
          <header className="chat-header">
            <button className="back-btn" onClick={() => navigate(-1)}>
              <ChevronLeft size={24} />
            </button>
            <div className="chat-header-info">
              <div className="chat-avatar">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${chatInfo.subject?.name || "Class"}`} alt="Avatar" />
              </div>
              <div className="chat-title-group">
                <h3>{chatInfo.class?.name} {chatInfo.section?.name}</h3>
                <span className="chat-status">{chatInfo.subject?.name} · Online</span>
              </div>
            </div>
            <button className="info-btn">
              <Info size={20} />
            </button>
          </header>

          <main className="chat-messages">
            <div className="notice-banner">
              Official Class GroupChat
            </div>

            {messages.map((msg, i) => {
              const matchesMe = msg.senderId === user?.id;
              const isTeacher = msg.from === "teacher";

              return (
                <div key={msg.id || i} className={`message-row ${matchesMe ? 'me' : ''}`}>
                  {!matchesMe && (
                    <div className="sender-avatar">
                      <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${msg.name}`} alt="S" />
                    </div>
                  )}
                  <div className={`message-content ${isTeacher ? 'teacher-style' : ''}`}>
                    {!matchesMe && <span className="sender-name">{msg.name} {isTeacher ? '(Teacher)' : ''}</span>}

                    {msg.imageUrl && (
                      <div className="message-image">
                        <img src={msg.imageUrl} alt="Uploaded" onClick={() => window.open(msg.imageUrl, '_blank')} />
                      </div>
                    )}

                    {msg.text && <p className="message-text">{msg.text}</p>}

                    <span className="message-time">{msg.time}</span>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} className="scroll-spacer" />
          </main>

          <footer className="chat-footer">
            <div className="input-bar">
              <button className="action-btn" onClick={() => fileRef.current?.click()}>
                <Plus size={24} />
              </button>
              <div className="message-input-wrapper">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                />
                <button className={`mic-btn ${isRecording ? 'recording' : ''}`} onClick={toggleRecording}>
                  <Mic size={20} />
                </button>
              </div>
              {input.trim() ? (
                <button className="send-btn" onClick={() => sendMessage(input)}>
                  <Send size={24} />
                </button>
              ) : null}
            </div>

            <input
              type="file"
              ref={fileRef}
              style={{ display: 'none' }}
              onChange={handleFileUpload}
              accept="image/*"
            />
          </footer>
        </div>
      )}

      <Footer />
    </div>
  );
}
