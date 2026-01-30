import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, RefreshCw, AlertCircle, Clock, ChevronDown } from "lucide-react";
import "./TeacherTimetable.css";
import { getTeacherTimetable } from "./TeacherTimetable";
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import Floating from "../../floatingbutton/Floating.jsx";

export default function TeacherTimetable() {
    const [timetable, setTimetable] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Config state
    const [selectedGrade, setSelectedGrade] = useState("Grade 6");
    const [selectedSection, setSelectedSection] = useState("A");

    // Mocked class list - in a real app, this comes from teacher's assigned classes
    const classes = [
        { grade: "Grade 6", section: "A", class_id: 1, section_id: 1 },
        { grade: "Grade 6", section: "B", class_id: 1, section_id: 2 },
        { grade: "Grade 7", section: "A", class_id: 2, section_id: 3 },
    ];

    const fetchTimetable = async () => {
        try {
            setLoading(true);
            setError(null);

            const current = classes.find(c => c.grade === selectedGrade && c.section === selectedSection);
            const data = await getTeacherTimetable({
                class_id: current?.class_id || 1,
                section_id: current?.section_id || 1
            });

            // Group by day_of_week
            const grouped = data.reduce((acc, entry) => {
                const day = entry.day_of_week;
                if (!acc[day]) acc[day] = [];
                acc[day].push(entry);
                return acc;
            }, {});

            setTimetable(grouped);
        } catch (err) {
            setError("Unable to load timetable records. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTimetable();
    }, [selectedGrade, selectedSection]);

    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    return (
        <div className="home">
            <Header />

            <main className="home-scroll">
                <div className="teacher-timetable-container">
                    <header className="timetable-header">
                        <h1>Master Timetable</h1>
                        <p>Managing academic schedules across sections</p>
                    </header>

                    {/* CLASS SELECTION HUB */}
                    <section className="timetable-config">
                        <div className="config-grid">
                            <div className="glass-select">
                                <label className="select-label">Select Grade</label>
                                <div className="select-trigger">
                                    <span>{selectedGrade}</span>
                                    <ChevronDown size={14} />
                                </div>
                            </div>
                            <div className="glass-select">
                                <label className="select-label">Select Section</label>
                                <div className="select-trigger">
                                    <span>Section {selectedSection}</span>
                                    <ChevronDown size={14} />
                                </div>
                            </div>
                        </div>
                    </section>

                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div
                                className="loading-state"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <RefreshCw className="animate-spin" size={40} color="#0d9488" />
                                <p>Syncing class schedules...</p>
                            </motion.div>
                        ) : error ? (
                            <motion.div
                                className="error-state"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <AlertCircle size={48} color="#ef4444" />
                                <p>{error}</p>
                                <button className="retry-btn" onClick={fetchTimetable}>Retry Sync</button>
                            </motion.div>
                        ) : Object.keys(timetable).length === 0 ? (
                            <motion.div
                                className="empty-state"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <Calendar size={48} color="rgba(255,255,255,0.1)" />
                                <p>No timetable entries assigned for this section yet.</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                className="timetable-grid"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                {days.map((day) => timetable[day] && (
                                    <section key={day} className="day-section">
                                        <h3 className="day-title">{day}</h3>
                                        <div className="entries-list">
                                            {timetable[day].map((entry) => (
                                                <div key={entry.id} className={`entry-card ${entry.is_break ? 'is-break' : ''}`}>
                                                    <div className="time-slot">
                                                        <span className="start-time">{entry.start_time.slice(0, 5)}</span>
                                                        <span className="end-time">{entry.end_time.slice(0, 5)}</span>
                                                    </div>
                                                    <div className="entry-info">
                                                        <h4>{entry.is_break ? entry.title : (entry.subject_name || "Academic Session")}</h4>
                                                        <p>{entry.is_break ? "Scheduled Break" : `In Person • ${selectedGrade}-${selectedSection}`}</p>
                                                    </div>
                                                    {!entry.is_break && <Clock size={16} color="rgba(13, 148, 136, 0.2)" />}
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <div className="bottom-spacer" />
            </main>

            <Floating />
            <Footer />
        </div>
    );
}
