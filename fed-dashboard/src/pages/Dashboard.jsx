import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // FIX: Remove 'isLoggedIn' key for proper logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>🎓 My Dashboard</h2>
        <nav style={styles.nav}>
          <Link to="/dashboard" style={styles.link}>
            🏠 Home
          </Link>
          <Link to="/profile" style={styles.link}>
            👤 Profile
          </Link>
          <Link to="/courses" style={styles.link}>
            📘 Courses
          </Link>
          <Link to="/project" style={styles.link}>
          🚀 Projects
          </Link>
        </nav>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          🚪 Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        <h1>Welcome to Your Dashboard</h1>
        <p>
          Use the sidebar to explore your profile, courses, and other sections.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#0d2840",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "20px",
  },
  logo: {
    marginBottom: "30px",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "15px",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "16px",
    padding: "10px 15px",
    borderRadius: "8px",
    transition: "background 0.3s",
  },
  logoutBtn: {
    marginTop: "auto",
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
  },
  main: {
    flex: 1,
    padding: "40px",
    backgroundColor: "#f4f6f8",
  },
};

export default Dashboard;