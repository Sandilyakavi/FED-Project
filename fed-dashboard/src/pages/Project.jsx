import React from "react";
import "./Project.css";

const projects = [
  {
    id: 1,
    title: "AI Vehicle Detection",
    description: "A real-time vehicle detection system using YOLOv8 and OpenCV.",
    progress: 80,
  },
  {
    id: 2,
    title: "Student Management Portal",
    description: "A MERN stack app for managing student records and performance.",
    progress: 65,
  },
  {
    id: 3,
    title: "Smart Farming Dashboard",
    description: "IoT-based crop monitoring dashboard with live sensor data.",
    progress: 90,
  },
];

const Project = () => {
  return (
    <div className="project-page">
      <h1 className="project-title">Your Projects</h1>
      <div className="project-grid">
        {projects.map((proj) => (
          <div key={proj.id} className="project-card">
            <h2>{proj.title}</h2>
            <p>{proj.description}</p>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${proj.progress}%` }}
              ></div>
            </div>
            <button className="view-btn">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
