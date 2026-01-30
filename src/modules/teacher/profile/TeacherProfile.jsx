import "./TeacherProfile.css";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import { ArrowLeft, User, Mail, Shield, Moon, Sun, ChevronRight, LogOut, Bell, Mic, Plus, FileText, Send, X } from "lucide-react";

import avatar from "../../../assets/images/login image 2.png"; // Reusing existing asset or placeholder

export default function TeacherProfile() {
    const navigate = useNavigate();
    // Mock theme state - normally this would come from context
    const [isDark, setIsDark] = useState(false);

    // ELITE INPUT BAR STATE
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [query, setQuery] = useState("");

    const toggleTheme = () => {
        // In a real app, this would toggle a context or global class
        setIsDark(!isDark);
        // document.body.classList.toggle('dark-theme');
    };

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

    const menuItems = [
        { icon: <User size={20} />, label: "Personal Information", desc: "Update your details" },
        { icon: <Shield size={20} />, label: "Privacy & Security", desc: "Password, 2FA" },
        { icon: <Bell size={20} />, label: "Notifications", desc: "Manage alerts" },
    ];

    return (
        <div className={`teacher-profile-page ${isDark ? 'dark-preview' : ''}`}>
            <Header />

            <main className="profile-scroll-container">

                {/* TOP BAR / BACK BUTTON */}
                <div className="profile-header-actions">
                    <button className="back-btn" onClick={() => navigate(-1)} aria-label="Go Back">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="page-title">My Profile</h1>
                    <div style={{ width: 40 }}></div> {/* Spacer for balance */}
                </div>

                {/* PROFILE CARD */}
                <div className="profile-card hero-card">
                    <div className="avatar-wrapper">
                        <img src={avatar} alt="Profile" className="profile-avatar" />
                        <div className="status-indicator"></div>
                    </div>
                    <div className="profile-info-center">
                        <h2>Sarah Anderson</h2>
                        <span className="role-badge">Senior Teacher</span>
                        <p className="email-text"><Mail size={14} /> sarah.anderson@school.edu</p>
                    </div>
                </div>

                {/* SETTINGS GRID */}
                <div className="settings-grid">

                    {/* THEME TOGGLE CARD */}
                    <div className="setting-card theme-card" onClick={toggleTheme}>
                        <div className="icon-box theme-icon">
                            {isDark ? <Moon size={22} /> : <Sun size={22} />}
                        </div>
                        <div className="setting-text">
                            <h3>Appearance</h3>
                            <p>{isDark ? 'Dark Mode' : 'Light Mode'} Enabled</p>
                        </div>
                        <div className="toggle-switch">
                            <div className={`switch-knob ${isDark ? 'active' : ''}`}></div>
                        </div>
                    </div>

                    {/* MENU ITEMS */}
                    {menuItems.map((item, index) => (
                        <div key={index} className="setting-card menu-card">
                            <div className="icon-box">{item.icon}</div>
                            <div className="setting-text">
                                <h3>{item.label}</h3>
                                <p>{item.desc}</p>
                            </div>
                            <ChevronRight size={20} className="chevron" />
                        </div>
                    ))}

                    {/* LOGOUT */}
                    <div className="setting-card logout-card">
                        <div className="icon-box danger-icon"><LogOut size={20} /></div>
                        <div className="setting-text">
                            <h3 className="danger-text">Log Out</h3>
                        </div>
                    </div>

                </div>

                <div className="spacer-bottom" />
            </main>

            {/* ELITE INPUT BAR */}
            <footer className="interaction-bar profile-input-bar">
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
