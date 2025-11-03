import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { week: "Week 1", score: 70 },
  { week: "Week 2", score: 75 },
  { week: "Week 3", score: 82 },
  { week: "Week 4", score: 88 },
  { week: "Week 5", score: 93 },
];

export default function Performance() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Performance Overview</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Track your learning trends and performance scores.
      </p>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Weekly Improvement</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
