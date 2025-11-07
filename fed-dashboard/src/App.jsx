import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Project from "./pages/Project";
import Profile from "./pages/Profile";
import Performance from "./pages/Performance";

function App() {
  const user = localStorage.getItem("user");

  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/project" element={<Project />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/performance" element={<Performance />} />
      </Routes>
    </Router>
  );
}

export default App;
