// src/pages/Tasks.jsx
import React, { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import "./Tasks.css";

const Tasks = () => {
  const [tasks, setTasks] = useLocalStorage("userTasks", [
    {
      id: 1,
      title: "Assignment 4 - Database Normalization",
      priority: "high",
      dueDate: "2025-12-02",
      completed: false,
    },
    {
      id: 2,
      title: "Weekly Quiz - ER Diagrams",
      priority: "medium",
      dueDate: "2025-12-03",
      completed: false,
    },
    {
      id: 3,
      title: "Project Demo - Solar Tracker",
      priority: "high",
      dueDate: "2025-12-06",
      completed: false,
    },
  ]);

  const [newTask, setNewTask] = useState({
    title: "",
    priority: "medium",
    dueDate: "",
  });

  const priorityStyles = {
    high: {
      label: "High",
      bg: "rgba(239, 68, 68, 0.12)",
      color: "#ef4444",
    },
    medium: {
      label: "Medium",
      bg: "rgba(59, 130, 246, 0.12)",
      color: "#3b82f6",
    },
    low: {
      label: "Low",
      bg: "rgba(16, 185, 129, 0.12)",
      color: "#10b981",
    },
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    const task = {
      id: Date.now(),
      title: newTask.title.trim(),
      priority: newTask.priority,
      dueDate: newTask.dueDate || null,
      completed: false,
    };

    setTasks((prev) => [task, ...prev]);
    setNewTask({ title: "", priority: "medium", dueDate: "" });
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
  };
  const pending = stats.total - stats.completed;

  const upcomingTasks = tasks
    .filter((t) => !t.completed)
    .sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <div className="tasks-page">
      <header className="page-header">
        <h1>📋 Tasks & Deadlines</h1>
        <p>Stay on top of assignments, quizzes, and project milestones.</p>
      </header>

      {/* Stats row */}
      <section className="tasks-stats">
        <div className="stat-card">
          <div className="stat-number">{pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total</div>
        </div>
      </section>

      {/* Add task */}
      <section className="add-task-card">
        <form className="add-task-form" onSubmit={addTask}>
          <div className="form-row">
            <input
              className="task-input"
              type="text"
              placeholder="Add new task (e.g., Finish DS assignment)"
              value={newTask.title}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <input
              className="date-input"
              type="date"
              value={newTask.dueDate}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, dueDate: e.target.value }))
              }
            />
          </div>
          <div className="form-row">
            <select
              className="priority-select"
              value={newTask.priority}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, priority: e.target.value }))
              }
            >
              <option value="low">Low priority</option>
              <option value="medium">Medium priority</option>
              <option value="high">High priority</option>
            </select>
            <button className="add-btn" type="submit">
              ➕ Add Task
            </button>
          </div>
        </form>
      </section>

      {/* Upcoming tasks */}
      <section className="tasks-section">
        <h2 className="section-title">
          ⏰ Upcoming <span>({upcomingTasks.length})</span>
        </h2>
        <div className="tasks-list">
          {upcomingTasks.length === 0 && (
            <p className="empty-text">No pending tasks. Great job! 🎉</p>
          )}
          {upcomingTasks.map((task) => {
            const style = priorityStyles[task.priority] || priorityStyles.medium;
            const isOverdue =
              task.dueDate && new Date(task.dueDate) < new Date();

            return (
              <article key={task.id} className="task-card">
                <label className="task-checkbox">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                </label>
                <div className="task-content">
                  <h3 className="task-title">{task.title}</h3>
                  <div className="task-meta">
                    <span
                      className="priority-badge"
                      style={{ backgroundColor: style.bg, color: style.color }}
                    >
                      {style.label}
                    </span>
                    <span
                      className={`due-date ${
                        isOverdue ? "overdue" : ""
                      }`.trim()}
                    >
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "No due date"}
                    </span>
                  </div>
                </div>
                <button
                  className="delete-btn"
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  title="Delete task"
                >
                  ✕
                </button>
              </article>
            );
          })}
        </div>
      </section>

      {/* Completed */}
      {completedTasks.length > 0 && (
        <section className="tasks-section">
          <h2 className="section-title">
            ✅ Completed <span>({completedTasks.length})</span>
          </h2>
          <div className="tasks-list">
            {completedTasks.map((task) => (
              <article key={task.id} className="task-card completed">
                <label className="task-checkbox">
                  <input type="checkbox" checked readOnly />
                </label>
                <div className="task-content">
                  <h3 className="task-title">{task.title}</h3>
                  <div className="task-meta">
                    <span>Done</span>
                    <span>
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : ""}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Tasks;
