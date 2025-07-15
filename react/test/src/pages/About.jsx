import React, { useState, useEffect } from 'react';

const AboutMe = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('adminDarkMode') === 'true');

  useEffect(() => {
    localStorage.setItem('adminDarkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen flex justify-center items-start pt-16 px-4 transition-colors duration-300 ${
        darkMode ? 'bg-[#121212] text-[#e0e0e0]' : 'bg-[#f5f6fa] text-[#2d3436]'
      } font-sans`}
    >
      <main
        className={`relative max-w-3xl w-full rounded-3xl p-12 shadow-lg transition-colors duration-300
          ${darkMode ? 'bg-[#1e1e1e] shadow-[#bb86fc]/50' : 'bg-white shadow-[#6c5ce7]/30'}
        `}
      >
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(prev => !prev)}
          aria-label="Toggle dark mode"
          className={`absolute top-6 right-6 px-5 py-2 rounded-md font-semibold cursor-pointer
            transition-colors duration-300
            ${
              darkMode
                ? 'bg-transparent border border-[#bb86fc] text-[#e0e0e0] hover:bg-[#bb86fc] hover:text-[#121212]'
                : 'bg-transparent border border-[#6c5ce7] text-[#2d3436] hover:bg-[#6c5ce7] hover:text-white'
            }
          `}
        >
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>

        <h1
          className={`text-center mb-10 text-3xl font-extrabold uppercase tracking-wide ${
            darkMode ? 'text-[#bb86fc]' : 'text-[#6c5ce7]'
          }`}
        >
          About Budget Mate
        </h1>

        <p className="mb-10 max-w-xl mx-auto leading-relaxed text-lg">
          Budget Mate is a smart and easy-to-use personal finance tracker that helps you monitor your income and expenses efficiently.
          Whether you are budgeting for everyday expenses or planning long-term financial goals,
          Budget Mate simplifies your financial management with vibrant visuals and intuitive features.
        </p>

        <h2
          className={`mb-6 border-b-4 pb-2 text-xl font-semibold max-w-xl mx-auto ${
            darkMode ? 'border-[#bb86fc] text-[#bb86fc]' : 'border-[#6c5ce7] text-[#6c5ce7]'
          }`}
        >
          Key Features
        </h2>
        <ul
          className={`mb-12 list-disc list-inside space-y-3 font-medium max-w-xl mx-auto ${
            darkMode ? 'text-[#b497f7]' : 'text-[#555]'
          }`}
        >
          <li>Track your income and expenses easily</li>
          <li>Interactive and colorful spending charts</li>
          <li>Set budgets and get smart alerts</li>
          <li>Export data to PDF or Excel formats</li>
          <li>Dark mode with vivid contrast</li>
          <li>Fully responsive across devices</li>
        </ul>

        <h2
          className={`mb-6 border-b-4 pb-2 text-xl font-semibold max-w-xl mx-auto ${
            darkMode ? 'border-[#bb86fc] text-[#bb86fc]' : 'border-[#6c5ce7] text-[#6c5ce7]'
          }`}
        >
          About the Developer
        </h2>
        <p
          className={`leading-relaxed max-w-xl mx-auto text-lg ${
            darkMode ? 'text-[#d3c4fc]' : 'text-[#444]'
          }`}
        >
          Developed by Grish Pradhan, a passionate software developer and cybersecurity student,
          Budget Mate is created to empower users with engaging and effective tools to take control of their financial health.
        </p>
      </main>
    </div>
  );
};

export default AboutMe;
//Grish Pradhan