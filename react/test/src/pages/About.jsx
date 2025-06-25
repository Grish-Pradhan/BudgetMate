import React, { useState, useEffect } from 'react';

const AboutMe = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen flex justify-center items-center p-8 transition-colors duration-300 ${
        darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
      }`}
    >
      {/* Dark mode toggle button fixed top right */}
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className="fixed top-4 right-4 z-50 px-4 py-2 rounded-md border border-gray-500 hover:bg-gray-700 hover:text-white transition font-semibold shadow"
      >
        {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>

      {/* Content container */}
      <div
        className={`max-w-xl w-full rounded-lg p-8 shadow-md transition-colors duration-300
          ${darkMode ? 'bg-gray-800 border border-gray-600 text-gray-200' : 'bg-white border border-gray-300 text-gray-900'}
        `}
      >
        <h1 className="text-center mb-6 text-3xl font-extrabold uppercase tracking-wide text-purple-600">
          About Budget Mate
        </h1>

        <p className="mb-6 leading-relaxed text-base">
          Budget Mate is a smart and easy-to-use personal finance tracker that helps you monitor your income and expenses efficiently.
          Whether you are budgeting for everyday expenses or planning long-term financial goals,
          Budget Mate simplifies your financial management with vibrant visuals and intuitive features.
        </p>

        <h2 className="mb-4 border-b-4 border-purple-600 pb-1 text-xl font-semibold text-purple-600">
          Key Features
        </h2>
        <ul className={`mb-8 list-disc list-inside space-y-1 font-medium ${darkMode ? 'text-purple-300' : 'text-gray-700'}`}>
          <li>Track your income and expenses easily</li>
          <li>Interactive and colorful spending charts</li>
          <li>Set budgets and get smart alerts</li>
          <li>Export data to PDF or Excel formats</li>
          <li>Dark mode with vivid contrast</li>
          <li>Fully responsive across devices</li>
        </ul>

        <h2 className="mb-4 border-b-4 border-purple-600 pb-1 text-xl font-semibold text-purple-600">
          About the Developer
        </h2>
        <p className={`leading-relaxed text-base ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
          Developed by Grish Pradhan, a passionate software developer and cybersecurity student,
          Budget Mate is created to empower users with engaging and effective tools to take control of their financial health.
        </p>
      </div>
    </div>
  );
};

export default AboutMe;
