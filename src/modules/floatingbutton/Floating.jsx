import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  X,
  User,
  Cloud,
  MessageSquare,
  HelpCircle,
  Bot
} from "lucide-react";
import "./Floating.css";

export default function Floating() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setOpen((o) => !o);
  };

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
      setOpen(false);
    }
  };

  const menuItems = [
    { id: "a1", icon: <User size={20} />, label: "Profile", path: "/teachers/profile", delay: 0.3 },
    { id: "a2", icon: <Cloud size={20} />, label: "Cloud", path: "/teachers/cloud", delay: 0.2 },
    { id: "a3", icon: <Bot size={20} />, label: "Robot Assistant", path: "/teachers/robot", delay: 0.1 },
    { id: "a4", icon: <HelpCircle size={20} />, label: "Help", path: "/teachers/help", delay: 0 },
  ];

  return (
    <motion.div
      className={`fab-wrapper ${open ? "open" : ""}`}
      drag
      dragConstraints={{ left: -window.innerWidth + 80, right: 0, top: -window.innerHeight + 120, bottom: 0 }}
      whileDrag={{ scale: 0.95, cursor: "grabbing" }}
    >
      {/* Action Buttons (Menu items) */}
      <div className="fab-menu">
        <AnimatePresence>
          {open && menuItems.map((item) => (
            <motion.button
              key={item.id}
              className={`fab-action ${item.id}`}
              aria-label={item.label}
              onClick={() => handleNavigation(item.path)}
              initial={{ scale: 0, opacity: 0, x: 20, y: 20 }}
              animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
              exit={{ scale: 0, opacity: 0, x: 20, y: 20 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: item.delay
              }}
            >
              {item.icon}
              <span className="fab-label">{item.label}</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Main Switch Button */}
      <motion.button
        className="fab-main"
        onClick={handleToggle}
        aria-label={open ? "Close menu" : "Open menu"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          className="fab-icon-container"
          animate={{ rotate: open ? 0 : 0 }}
        >
          {open ? <X size={26} strokeWidth={2.5} /> : <Plus size={26} strokeWidth={2.5} />}
        </motion.div>
      </motion.button>
    </motion.div>
  );
}
