import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">FED Portal</h2>
      <ul>
        <li>
          <Link to="/dashboard">🏠 Home</Link>
        </li>
        <li>
          <Link to="/courses">📚 Courses</Link>
        </li>
        <li>
          <Link to="/projects">🚀 Projects</Link>
        </li>
        <li>
          <Link to="/profile">💼 Profile</Link>
        </li>
        <li>
          <Link to="/settings">⚙ Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;