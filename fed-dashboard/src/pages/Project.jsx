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
      pdf: "/pdfs/solar.pdf",
    },
    {
      id: 2,
      title: "Community Recycling App",
      description: "An app to encourage recycling practices in neighborhoods.",
      status: "Completed",
      pdf: "/pdfs/community.pdf",
    },
    {
      id: 3,
      title: "Water Conservation Platform",
      description: "Online community forum for water-saving tips and projects.",
      status: "Planned",
      pdf: "/pdfs/energy.pdf",
    },
  ]);

  const handleViewPDF = (pdfPath) => {
    window.open(pdfPath, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="projects-container">
      <h2>🚀 Projects</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p className="project-status">Status: {project.status}</p>
            <button
              className="view-pdf-btn"
              onClick={() => handleViewPDF(project.pdf)}
            >
              View PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;