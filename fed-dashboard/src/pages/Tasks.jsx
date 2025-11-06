import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Tasks = () => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">Upcoming Tasks</h1>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
            <li>Assignment 4 - Due Monday</li>
            <li>Quiz - Tuesday</li>
            <li>Project Demo - Friday</li>
          </ul>
        </main>
      </div>
    </div>
  );
};

export default Tasks;
