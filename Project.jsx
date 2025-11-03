import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "./Project.css";

const Project = () => {
  const [projects] = useState([
    {
      id: 1,
      title: "Solar Panel Tracker",
      description: "A real-time dashboard to monitor solar panel output.",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Community Recycling App",
      description: "An app to encourage recycling practices in neighborhoods.",
      status: "Completed",
    },
    {
      id: 3,
      title: "Water Conservation Platform",
      description: "Online community forum for water-saving tips and projects.",
      status: "Planned",
    },
  ]);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div className="projects-container">
        <h2>🚀 Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p className="project-status">Status: {project.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
