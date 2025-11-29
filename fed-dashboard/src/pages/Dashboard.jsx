// src/pages/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import "./Dashboard.css";

const Dashboard = () => {
  const [user] = useLocalStorage("user", null);

  return (
    <div className="dashboard-container">
      {/* Top stats cards */}
      <section className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div>
            <h3>3</h3>
            <p>Active Courses</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🚀</div>
          <div>
            <h3>2</h3>
            <p>Ongoing Projects</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div>
            <h3>78%</h3>
            <p>Average Progress</p>
          </div>
        </div>
      </section>

      {/* Hero welcome section */}
      <section className="dashboard-welcome">
        <div className="welcome-content">
          <h1>
            Welcome back{user && user.name ? `, ${user.name}` : ""} 👋
          </h1>
          <p>
            Track your learning journey, manage sustainable projects, and keep an
            eye on your performance in one clean dashboard.
          </p>

          <div className="welcome-actions">
            <Link to="/courses" className="cta-btn primary">
              🌿 Continue Courses
            </Link>
            <Link to="/projects" className="cta-btn secondary">
              🚀 View Projects
            </Link>
          </div>
        </div>

        <div className="welcome-visual">
          <div className="chart-placeholder">
            <span>📈</span>
            <div>Performance overview coming from the Performance page.</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
