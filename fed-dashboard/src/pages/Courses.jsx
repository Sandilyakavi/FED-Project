import React, { useState } from "react";
import "./Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Renewable Energy Basics",
      description: "Learn how solar, wind, and hydro power help create a sustainable future.",
      progress: 70,
      pdf: "/pdfs/renewable.pdf",
    },
    {
      id: 2,
      title: "Waste Reduction & Recycling",
      description: "Understand waste management and recycling techniques for a cleaner planet.",
      progress: 45,
      pdf: "/pdfs/recycling.pdf",
    },
    {
      id: 3,
      title: "Eco-Friendly Lifestyle",
      description: "Adopt habits to reduce your carbon footprint and promote green living.",
      progress: 90,
      pdf: "/pdfs/eco.pdf",
    },
  ]);

  const handleContinue = (pdfPath) => {
    window.open(pdfPath, "_blank"); // opens PDF in new tab
  };

  return (
    <div className="courses-container">
      <h2>🌿 Sustainable Living Courses</h2>
      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <p className="progress-text">Progress: {course.progress}%</p>
            <button onClick={() => handleContinue(course.pdf)}>Continue</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;