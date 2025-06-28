import React, { useState, useEffect } from 'react';

const AboutMe = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('adminDarkMode') === 'true');

  useEffect(() => {
    localStorage.setItem('adminDarkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen w-full flex justify-center items-start pt-16 px-4
        ${darkMode ? 'bg-[#121212] text-[#e0e0e0]' : 'bg-[#f5f6fa] text-[#2d3436]'}
      `}
    >
      <div
        className={`max-w-3xl w-full rounded-lg p-8 shadow-md transition-colors duration-300
          ${darkMode ? 'bg-[#1e1e1e]' : 'bg-white'}
          text-base
        `}
        style={{
          boxShadow: darkMode
            ? '0 2px 8px rgb(255 255 255 / 0.1)'
            : '0 2px 8px rgb(0 0 0 / 0.1)',
          border: 'none',
        }}
      >
        {/* Dark Mode Toggle inside container, top-right */}
        <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
          <button
            onClick={() => setDarkMode(prev => !prev)}
            aria-label="Toggle dark mode"
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              fontWeight: '600',
              cursor: 'pointer',
              backgroundColor: 'transparent',
              color: darkMode ? '#e0e0e0' : '#2d3436',
              transition: 'color 0.3s, background-color 0.3s',
              border: darkMode ? '1px solid #bb86fc' : '1px solid #6c5ce7',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = darkMode ? '#bb86fc' : '#6c5ce7';
              e.currentTarget.style.color = darkMode ? '#121212' : '#fff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = darkMode ? '#e0e0e0' : '#2d3436';
            }}
          >
            {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <h1
          className={`text-center mb-8 text-3xl font-extrabold uppercase tracking-wide
            ${darkMode ? 'text-[#bb86fc]' : 'text-[#6c5ce7]'}
          `}
        >
          About Budget Mate
        </h1>

        <p className="mb-8 max-w-xl mx-auto leading-relaxed">
          Budget Mate is a smart and easy-to-use personal finance tracker that helps you monitor your income and expenses efficiently.
          Whether you are budgeting for everyday expenses or planning long-term financial goals,
          Budget Mate simplifies your financial management with vibrant visuals and intuitive features.
        </p>

        <h2
          className={`mb-6 border-b-4 pb-2 text-xl font-semibold max-w-xl mx-auto
            ${darkMode ? 'border-[#bb86fc] text-[#bb86fc]' : 'border-[#6c5ce7] text-[#6c5ce7]'}
          `}
        >
          Key Features
        </h2>
        <ul
          className={`mb-10 list-disc list-inside space-y-2 font-medium max-w-xl mx-auto
            ${darkMode ? 'text-[#b497f7]' : 'text-[#555]'}
          `}
        >
          <li>Track your income and expenses easily</li>
          <li>Interactive and colorful spending charts</li>
          <li>Set budgets and get smart alerts</li>
          <li>Export data to PDF or Excel formats</li>
          <li>Dark mode with vivid contrast</li>
          <li>Fully responsive across devices</li>
        </ul>

        <h2
          className={`mb-6 border-b-4 pb-2 text-xl font-semibold max-w-xl mx-auto
            ${darkMode ? 'border-[#bb86fc] text-[#bb86fc]' : 'border-[#6c5ce7] text-[#6c5ce7]'}
          `}
        >
          About the Developer
        </h2>
        <p
          className={`leading-relaxed max-w-xl mx-auto
            ${darkMode ? 'text-[#d3c4fc]' : 'text-[#444]'}
          `}
        >
          Developed by Grish Pradhan, a passionate software developer and cybersecurity student,
          Budget Mate is created to empower users with engaging and effective tools to take control of their financial health.
        </p>
      </div>
    </div>
  );
};

export default AboutMe;
//Grish Pradhan