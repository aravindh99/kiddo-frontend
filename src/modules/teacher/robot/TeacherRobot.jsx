import "./TeacherRobot.css";

import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";

// Replaced react-icons with lucide-react to ensure availability and consistency
import { Mic, Plus, FileText, Send, Bot, X } from "lucide-react";

import { useRef, useState } from "react";

// Using a require or just commenting out image if it causes issues. 
// Assuming image exists, but wrapping in try/catch logic isn't possible for imports.
// Changed to absolute path relative to src if needed, but relative should work.
// If this still fails, I will use a placeholder icon instead of image.
import aiImage from "../../../assets/images/login image 2.png";

export default function TeacherRobot() {
    const suggestions = [
        "Lesson plan for Grade 10 Math",
        "Generate quiz questions for Physics",
        "Draft a parent email template",
        "Analyze student performance trends"
    ];

    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [query, setQuery] = useState("");

    /* OPEN FILE PICKER */
    const openFilePicker = () => {
        fileInputRef.current?.click();
    };

    /* HANDLE FILE */
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setSelectedFile(file);

        // Image preview
        if (file.type.startsWith("image/")) {
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setPreviewUrl(null);
        }
    };

    return (
        <div className="teacher-robot-page">
            <Header />

            <main className="robot-scroll-container">
                <div className="robot-presentation">
                    <div className="robot-avatar-ring">
                        {/* Added error handling for image */}
                        <img
                            src={aiImage}
                            alt="AI Assistant"
                            onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<div style="font-size:40px">🤖</div>'; }}
                        />
                    </div>
                </div>

                <h2 className="helper-title">Professor's AI Assistant</h2>

                <section className="suggestion-chips-wrapper">
                    <span className="suggestion-label">Quick Actions:</span>
                    <div className="chips-grid">
                        {suggestions.map((q) => (
                            <button key={q} className="suggestion-chip" onClick={() => setQuery(q)}>
                                {q}
                            </button>
                        ))}
                    </div>
                </section>

                <div className="conversation-area">
                    <div className="system-message">
                        <div className="message-avatar">
                            <Bot size={20} />
                        </div>
                        <div className="message-content">
                            <strong>Ready to assist.</strong>
                            <p>I can help you create lesson plans, grade assignments, or organize your schedule. What's on your mind regarding your classes today?</p>
                            <span className="timestamp">Active Now</span>
                        </div>
                    </div>
                </div>

                <div className="spacer-bottom" />
            </main>

            {/* INPUT BAR */}
            <footer className="interaction-bar">
                <button className="icon-btn-secondary" onClick={openFilePicker} aria-label="Upload File">
                    <Plus size={24} />
                </button>

                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden-input"
                    onChange={handleFileChange}
                    accept="image/*,.pdf,.doc,.docx"
                />

                <div className="input-field-wrapper">
                    <input
                        placeholder="Type a message..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button className="icon-btn-primary inside-input" aria-label="Send">
                        {query ? <Send size={20} /> : <Mic size={22} />}
                    </button>
                </div>

                {/* FILE PREVIEW OVERLAY */}
                {selectedFile && (
                    <div className="upload-preview">
                        {previewUrl ? (
                            <img src={previewUrl} alt="preview" />
                        ) : (
                            <FileText size={24} />
                        )}
                        <span className="filename">{selectedFile.name}</span>
                        <button className="clear-file" onClick={() => { setSelectedFile(null); setPreviewUrl(null); }}><X size={16} /></button>
                    </div>
                )}
            </footer>

            <Footer />
        </div>
    );
}
