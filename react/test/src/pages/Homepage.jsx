import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('adminDarkMode') === 'true');

  useEffect(() => {
    localStorage.setItem('adminDarkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'bg-[#121212] text-[#e0e0e0]' : 'bg-[#f5f6fa] text-[#2d3436]'
      }`}
    >
      {/* Container ko padding */}
      <div className="max-w-6xl mx-auto px-6 pt-6">
        {/* dark mode toggle ko lagi */}
        <div className="flex justify-end mb-6">
          <button
            type="button"
            onClick={() => setDarkMode((prev) => !prev)}
            aria-label="Toggle dark mode"
            className={`px-4 py-2 rounded-md font-semibold cursor-pointer transition-colors duration-300
              focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                darkMode
                  ? 'bg-transparent border border-[#bb86fc] text-[#e0e0e0] hover:bg-[#bb86fc] hover:text-[#121212] focus:ring-[#bb86fc]'
                  : 'bg-transparent border border-[#6c5ce7] text-[#2d3436] hover:bg-[#6c5ce7] hover:text-white focus:ring-[#6c5ce7]'
              }
            `}
          >
            {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* main section */}
        <section className="text-center px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-600 transition-colors duration-300">
            Master Your Money, The Smart Way
          </h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto transition-colors duration-300">
            Welcome to BudgetMate – Your all-in-one personal finance dashboard. Track expenses, create budgets, and gain full control of your financial life.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/login"
              className="bg-purple-600 text-white px-6 py-3 rounded font-semibold shadow-md hover:bg-purple-700 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 text-white px-6 py-3 rounded font-semibold shadow-md hover:bg-green-600 transition"
            >
              Get Started
            </Link>
          </div>
        </section>

        {/* features section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-8 py-16">
          {[
            {
              title: '📊 Real-Time Insights',
              desc: 'Track your expenses and income in real-time with beautiful charts and graphs.',
            },
            {
              title: '💡 Smart Budgeting',
              desc: 'Create monthly budgets, set goals, and get intelligent tips to save more.',
            },
            {
              title: '🔐 Secure & Private',
              desc: 'All your data is encrypted and stored securely — only you can access it.',
            },
            {
              title: '📁 Easy Export',
              desc: 'Export your financial reports in CSV or PDF formats for your own records.',
            },
          ].map(({ title, desc }) => (
            <div
              key={title}
              className={`rounded-xl shadow-md p-6 text-center transition-colors duration-300 ${
                darkMode ? 'bg-[#1e1e1e] shadow-[#bb86fc]/20' : 'bg-white shadow-[#6c5ce7]/20'
              }`}
            >
              <h3 className="text-xl font-bold text-purple-600 mb-2">{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </section>

        {/* for footer */}
        <footer
          className={`text-center py-6 text-sm transition-colors duration-300 ${
            darkMode ? 'bg-[#2a2a2a] text-gray-300' : 'bg-white text-gray-500'
          }`}
        >
          &copy; 2025 BudgetMate. Designed with 💜 for smarter finance.
        </footer>
      </div>
    </div>
  );
};

export default Homepage;
//Grish Pradhan