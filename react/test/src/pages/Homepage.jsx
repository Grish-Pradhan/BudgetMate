import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('adminDarkMode') === 'true');

  useEffect(() => {
    localStorage.setItem('adminDarkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-[#121212] text-[#ccc]' : 'bg-[#f5f6fa] text-[#2d3436]'}`}>
      <div className="w-full max-w-6xl mx-auto px-6 pt-6 flex-grow flex flex-col">
        {/* Dark Mode Toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setDarkMode(prev => !prev)}
            aria-label="Toggle dark mode"
            className={`px-4 py-2 rounded-md font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
              darkMode
                ? 'bg-transparent border border-[#bb86fc] text-[#ccc] hover:bg-[#bb86fc] hover:text-[#121212] focus:ring-[#bb86fc]'
                : 'bg-transparent border border-[#6c5ce7] text-[#2d3436] hover:bg-[#6c5ce7] hover:text-white focus:ring-[#6c5ce7]'
            }`}
          >
            {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* Hero Section */}
        <section className="flex-1 flex flex-col items-center justify-center text-center py-12 px-4">
          <h1 className={`text-4xl md:text-5xl font-extrabold mb-4 ${darkMode ? 'text-[#bb86fc]' : 'text-[#3f3d56]'}`}>
            Master Your Money, The Smart Way
          </h1>
          <p className={`text-lg max-w-2xl mx-auto mb-8 ${darkMode ? 'text-[#ccc]' : 'text-[#555]'}`}>
            Welcome to <strong>BudgetMate</strong> – Your all-in-one personal finance dashboard.
            Track expenses, create budgets, and gain full control of your financial life.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/login" className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-purple-700 transition">
              Login
            </Link>
            <Link to="/register" className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-green-600 transition">
              Get Started
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-8 py-16">
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
              className={`rounded-xl p-6 text-center shadow-md transition-colors duration-300 ${
                darkMode ? 'bg-[#1e1e1e] shadow-[#bb86fc]/20' : 'bg-white shadow-[#6c5ce7]/10'
              }`}
            >
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-[#bb86fc]' : 'text-[#3f3d56]'}`}>
                {title}
              </h3>
              <p className={`${darkMode ? 'text-[#ccc]' : 'text-[#555]'}`}>{desc}</p>
            </div>
          ))}
        </section>
      </div>

      {/* Footer */}
      <footer className={`text-center py-6 text-sm ${darkMode ? 'bg-[#2a2a2a] text-[#aaa]' : 'bg-white text-[#888]'}`}>
        &copy; 2025 BudgetMate. Designed with 💜 for smarter finance.
      </footer>
    </div>
  );
};

export default Homepage;
