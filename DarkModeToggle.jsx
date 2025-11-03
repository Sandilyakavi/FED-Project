import React from "react";
import { useAppContext } from "../context/AppContext";
import "./DarkModeToggle.css";

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useAppContext();

  return (
    <button className="toggle-btn" onClick={toggleDarkMode}>
      {isDarkMode ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
};

export default DarkModeToggle;
