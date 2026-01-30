import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, AlertCircle, RefreshCw } from "lucide-react";
import "./StudentsTimetable.css";
import { getStudentTimetable } from "./StudentsTimetable";
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import Floating from "../../floatingbutton/Floating.jsx";

export default function StudentTimetable() {
    const [timetable, setTimetable] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Mocked for now - normally fetched from student profile context
    const studentInfo = {
        class_id: 1,
        section_id: 1
    };

    const fetchTimetable = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getStudentTimetable(studentInfo);

            // Group by day_of_week
            const grouped = data.reduce((acc, entry) => {
                const day = entry.day_of_week;
                if (!acc[day]) acc[day] = [];
                acc[day].push(entry);
                return acc;
            }, {});

            setTimetable(grouped);
        } catch (err) {
            setError("Unable to load timetable. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTimetable();
    }, []);

    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="home">
            <Header />

            <main className="home-scroll">
                <div className="timetable-container">
                    <header className="timetable-header">
                        <h1>Class Timetable</h1>
                        <p>Your weekly academic schedule</p>
                    </header>

                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div
                                className="loading-state"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <RefreshCw className="animate-spin" size={40} color="var(--brand-blue)" />
                                <p>Aligning the stars...</p>
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
                                <button className="retry-btn" onClick={fetchTimetable}>Retry</button>
                            </motion.div>
                        ) : Object.keys(timetable).length === 0 ? (
                            <motion.div
                                className="empty-state"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <Calendar size={48} color="var(--text-secondary)" />
                                <p>No timetable entries found for your section.</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                className="timetable-grid"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {days.map((day) => timetable[day] && (
                                    <motion.section key={day} className="day-section" variants={itemVariants}>
                                        <h3 className="day-title">{day}</h3>
                                        <div className="entries-list">
                                            {timetable[day].map((entry) => (
                                                <div key={entry.id} className={`entry-card ${entry.is_break ? 'is-break' : ''}`}>
                                                    <div className="time-slot">
                                                        <span className="start-time">{entry.start_time.slice(0, 5)}</span>
                                                        <span className="end-time">{entry.end_time.slice(0, 5)}</span>
                                                    </div>
                                                    <div className="entry-info">
                                                        <h4>{entry.is_break ? entry.title : (entry.subject_name || "Subject")}</h4>
                                                        <p>{entry.is_break ? "Rest & Refresh" : "Active Session"}</p>
                                                    </div>
                                                    {!entry.is_break && <Clock size={16} color="rgba(255,255,255,0.3)" />}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.section>
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
