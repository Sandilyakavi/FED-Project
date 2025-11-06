import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">FED Dashboard</h2>

      <ul className="sidebar-menu">
        <li className={location.pathname === "/dashboard" ? "active" : ""}>
          <Link to="/dashboard">🏠 Dashboard</Link>
        </li>

        <li className={location.pathname === "/courses" ? "active" : ""}>
          <Link to="/courses">📚 Courses</Link>
        </li>

        <li className={location.pathname === "/projects" ? "active" : ""}>
          <Link to="/projects">🚀 Projects</Link>
        </li>

        <li className={location.pathname === "/performance" ? "active" : ""}>
          <Link to="/performance">📊 Performance</Link>
        </li>

        <li className={location.pathname === "/profile" ? "active" : ""}>
          <Link to="/profile">💼 Profile</Link>
        </li>

        <li>
          <Link to="/">🔒 Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
