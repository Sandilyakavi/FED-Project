// src/pages/Performance.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "./Performance.css";

const weeklyData = [
  { week: "Week 1", score: 70, hours: 8 },
  { week: "Week 2", score: 75, hours: 10 },
  { week: "Week 3", score: 82, hours: 12 },
  { week: "Week 4", score: 88, hours: 14 },
  { week: "Week 5", score: 93, hours: 16 },
];

const Performance = () => {
  const avgScore =
    Math.round(
      weeklyData.reduce((sum, d) => sum + d.score, 0) / weeklyData.length
    ) || 0;

  const totalHours =
    weeklyData.reduce((sum, d) => sum + d.hours, 0) || 0;

  const improvement =
    Math.round(
      ((weeklyData[weeklyData.length - 1].score - weeklyData[0].score) /
        weeklyData[0].score) *
        100
    ) || 0;

  const bestWeekScore = Math.max(...weeklyData.map((d) => d.score));

  return (
    <div className="performance-page">
      <header className="performance-header">
        <h1>📊 Performance Overview</h1>
        <p>
          Track your learning trends, see how your scores evolve week by week,
          and understand how study time impacts performance.
        </p>
      </header>

      {/* Top stats */}
      <section className="stats-grid">
        <div className="stat-card highlight">
          <div className="stat-number">{avgScore}%</div>
          <div className="stat-label">Average Score</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalHours}h</div>
          <div className="stat-label">Total Study Time</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{bestWeekScore}%</div>
          <div className="stat-label">Best Week Score</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">+{improvement}%</div>
          <div className="stat-label">Overall Improvement</div>
        </div>
      </section>

      {/* Charts */}
      <section className="charts-section">
        <div className="chart-card">
          <h3>Weekly Score Trend</h3>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={weeklyData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="week" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#3b82f6"
                strokeWidth={3}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Study Hours vs Score</h3>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={weeklyData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="week" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="hours"
                name="Study Hours"
                stroke="#10b981"
                strokeWidth={3}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="score"
                name="Score"
                stroke="#3b82f6"
                strokeWidth={3}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Actions */}
      <section className="actions-section">
        <button className="action-btn primary">
          📈 Log New Study Session
        </button>
        <button className="action-btn secondary">
          📊 Export Performance Data
        </button>
      </section>
    </div>
  );
};

export default Performance;
