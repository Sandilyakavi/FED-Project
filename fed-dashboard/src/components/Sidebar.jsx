// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { logoutUser } from "../utils/auth";
import "./Sidebar.css";

const Sidebar = ({ darkMode, setDarkMode, sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: "🏠" },
    { path: "/courses", label: "Courses", icon: "📚" },
    { path: "/projects", label: "Projects", icon: "🚀" },
    { path: "/performance", label: "Performance", icon: "📊" },
    { path: "/tasks", label: "Tasks", icon: "📋" },
    { path: "/profile", label: "Profile", icon: "💼" },
  ];

  const handleLogout = () => {
    logoutUser();
    setSidebarOpen(false);
    window.location.href = "/";
  };

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-logo">🌱 FED Dashboard</h2>

          <button
            className="theme-toggle"
            onClick={() => setDarkMode((prev) => !prev)}
            title="Toggle theme"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {navItems.map((item) => (
              <li
                key={item.path}
                className={
                  location.pathname === item.path
                    ? "nav-item active"
                    : "nav-item"
                }
              >
                <Link
                  to={item.path}
                  className="nav-link"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            🔒 Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
