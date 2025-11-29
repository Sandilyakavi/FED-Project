// src/pages/Courses.jsx
import React, { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import "./Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Renewable Energy Basics",
      description:
        "Learn how solar, wind, and hydro power help create a sustainable future.",
      progress: 70,
      pdf: "/pdfs/renewable.pdf",
    },
    {
      id: 2,
      title: "Waste Reduction & Recycling",
      description:
        "Understand waste management and recycling techniques for a cleaner planet.",
      progress: 45,
      pdf: "/pdfs/recycling.pdf",
    },
    {
      id: 3,
      title: "Eco-Friendly Lifestyle",
      description:
        "Adopt habits to reduce your carbon footprint and promote green living.",
      progress: 90,
      pdf: "/pdfs/eco.pdf",
    },
  ]);

  // Persist progress per course
  const [userProgress, setUserProgress] = useLocalStorage("courseProgress", {});

  const handleContinue = (pdfPath) => {
    window.open(pdfPath, "_blank", "noopener,noreferrer");
  };

  const updateProgress = (courseId, delta) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === courseId
          ? {
              ...course,
              progress: Math.max(
                0,
                Math.min(100, (userProgress[courseId] ?? course.progress) + delta)
              ),
            }
          : course
      )
    );

    setUserProgress((prev) => {
      const current = prev[courseId] ?? courses.find((c) => c.id === courseId)?.progress ?? 0;
      const next = Math.max(0, Math.min(100, current + delta));
      return { ...prev, [courseId]: next };
    });
  };

  return (
    <div className="courses-container">
      <h2>🌿 Sustainable Living Courses</h2>
      <div className="courses-grid">
        {courses.map((course) => {
          const saved = userProgress[course.id];
          const displayProgress =
            saved !== undefined ? saved : course.progress;

          return (
            <div key={course.id} className="course-card">
              <div className="course-header">
                <h3>{course.title}</h3>
                <span className="course-badge">
                  {displayProgress === 100 ? "Completed" : "In Progress"}
                </span>
              </div>

              <p className="course-description">{course.description}</p>

              <div className="progress-section">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${displayProgress}%` }}
                  />
                </div>
                <p className="progress-text">
                  {displayProgress}% Complete
                </p>
              </div>

              <div className="course-actions">
                <button
                  className="continue-btn"
                  onClick={() => handleContinue(course.pdf)}
                >
                  📖 Continue
                </button>
                <button
                  className="progress-btn"
                  onClick={() => updateProgress(course.id, 10)}
                  disabled={displayProgress >= 100}
                >
                  +10% Progress
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
