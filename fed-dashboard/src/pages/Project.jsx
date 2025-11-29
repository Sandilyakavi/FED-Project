// src/pages/Project.jsx
import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import "./Project.css";

const Project = () => {
  const [projects, setProjects] = useLocalStorage("userProjects", [
    {
      id: 1,
      title: "Solar Panel Tracker",
      description:
        "Real-time dashboard to monitor solar panel output and energy efficiency.",
      status: "in-progress",
      progress: 75,
      pdf: "/pdfs/solar.pdf",
      deadline: "2025-12-15",
    },
    {
      id: 2,
      title: "Community Recycling App",
      description:
        "Mobile app to encourage recycling practices in neighborhoods with gamification.",
      status: "completed",
      progress: 100,
      pdf: "/pdfs/community.pdf",
      deadline: "2025-11-20",
    },
    {
      id: 3,
      title: "Water Conservation Platform",
      description:
        "Online platform for sharing water-saving tips and tracking conservation projects.",
      status: "planned",
      progress: 20,
      pdf: "/pdfs/water.pdf",
      deadline: "2026-01-10",
    },
  ]);

  const statusStyles = {
    planned: {
      label: "Planned",
      bg: "rgba(245, 158, 11, 0.12)",
      color: "#f59e0b",
    },
    "in-progress": {
      label: "In Progress",
      bg: "rgba(59, 130, 246, 0.12)",
      color: "#3b82f6",
    },
    completed: {
      label: "Completed",
      bg: "rgba(16, 185, 129, 0.12)",
      color: "#10b981",
    },
  };

  const handleViewPDF = (pdfPath) => {
    window.open(pdfPath, "_blank", "noopener,noreferrer");
  };

  const updateProgress = (id, delta) => {
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id !== id) return project;
        const nextProgress = Math.max(
          0,
          Math.min(100, (project.progress ?? 0) + delta)
        );
        let nextStatus = project.status;
        if (nextProgress === 100) nextStatus = "completed";
        else if (nextProgress > 0) nextStatus = "in-progress";

        return { ...project, progress: nextProgress, status: nextStatus };
      })
    );
  };

  const completedCount = projects.filter((p) => p.status === "completed").length;
  const activeCount = projects.filter(
    (p) => p.status === "in-progress"
  ).length;
  const avgProgress =
    projects.length > 0
      ? Math.round(
          projects.reduce((sum, p) => sum + (p.progress || 0), 0) /
            projects.length
        )
      : 0;

  return (
    <div className="projects-page">
      <header className="page-header">
        <h1>🚀 Projects</h1>
        <p>
          Keep track of your sustainable development projects, their progress,
          and upcoming deadlines.
        </p>
      </header>

      <section className="projects-grid">
        {projects.map((project) => {
          const styles = statusStyles[project.status] || statusStyles.planned;

          return (
            <article key={project.id} className="project-card">
              <div className="project-header">
                <h2 className="project-title">{project.title}</h2>
                <span
                  className="status-badge"
                  style={{
                    backgroundColor: styles.bg,
                    color: styles.color,
                  }}
                >
                  {styles.label}
                </span>
              </div>

              <p className="project-description">{project.description}</p>

              <div className="project-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <p className="progress-text">
                  {project.progress}% complete
                </p>
              </div>

              <div className="project-meta">
                <span>
                  📅{" "}
                  {project.deadline
                    ? new Date(project.deadline).toLocaleDateString()
                    : "No deadline"}
                </span>
                <span>#{project.id.toString().padStart(2, "0")}</span>
              </div>

              <div className="project-actions">
                <button
                  className="project-btn view"
                  onClick={() => handleViewPDF(project.pdf)}
                >
                  📄 View PDF
                </button>

                {project.progress < 100 && (
                  <button
                    className="project-btn progress"
                    onClick={() => updateProgress(project.id, 10)}
                  >
                    +10% Progress
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </section>

      <section className="projects-summary">
        <div className="summary-stats">
          <div className="summary-item">
            <div className="summary-number">{completedCount}</div>
            <div className="summary-label">Completed</div>
          </div>
          <div className="summary-item">
            <div className="summary-number">{activeCount}</div>
            <div className="summary-label">Active</div>
          </div>
          <div className="summary-item">
            <div className="summary-number">{avgProgress}%</div>
            <div className="summary-label">Average Progress</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Project;
