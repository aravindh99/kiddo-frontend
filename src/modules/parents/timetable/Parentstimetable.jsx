import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, RefreshCw, AlertCircle, Clock } from "lucide-react";
import "./Parentstimetable.css";
import { getParentTimetable } from "./Parentstimetable";
import Header from "../header/Header.jsx";
import Footer from "../footer/ParentsFooter.jsx";
import Floating from "../../floatingbutton/Floating.jsx";

export default function ParentTimetable() {
    const students = [
        { id: 1, name: "Abhimanyu", grade: "Grade 4-A", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abhimanyu" },
        { id: 2, name: "Siddharth", grade: "Grade 2-B", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siddharth" },
    ];

    const [selectedStudent, setSelectedStudent] = useState(students[0]);
    const [timetable, setTimetable] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Derived from the parent's selection of their child
    const childInfo = {
        class_id: selectedStudent.id, // Using student ID as mock class ID for simplicity
        section_id: 1
    };

    const fetchTimetable = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getParentTimetable(childInfo);

            // Group by day_of_week
            const grouped = data.reduce((acc, entry) => {
                const day = entry.day_of_week;
                if (!acc[day]) acc[day] = [];
                acc[day].push(entry);
                return acc;
            }, {});

            setTimetable(grouped);
        } catch (err) {
            setError("Unable to load child's timetable. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTimetable();
    }, [selectedStudent]); // Refetch when student changes

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
            <Header
                students={students}
                selectedStudent={selectedStudent}
                onSwitch={setSelectedStudent}
            />

            <main className="home-scroll">
                <div className="parent-timetable-container">
                    <header className="timetable-header">
                        <h1>{selectedStudent.name}'s Schedule</h1>
                        <p>Weekly academic timetable for your ward</p>
                    </header>

                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div
                                key="loading"
                                className="loading-state"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{ marginTop: '40px' }}
                            >
                                <RefreshCw className="animate-spin" size={40} color="#FF6B6B" />
                                <p>Loading academic records for {selectedStudent.name}...</p>
                            </motion.div>
                        ) : error ? (
                            <motion.div
                                key="error"
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
                                key="empty"
                                className="empty-state"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <Calendar size={48} color="rgba(255,255,255,0.2)" />
                                <p>No timetable entries discovered yet.</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="content"
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
                                                        <p>{entry.is_break ? "Scheduled Break" : "In Session"}</p>
                                                    </div>
                                                    {!entry.is_break && <Clock size={16} color="rgba(255,255,255,0.2)" />}
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
