import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
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
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <button
        onClick={() => setDarkMode(prev => !prev)}
        className="fixed top-4 right-4 z-50 px-4 py-2 rounded-md border border-gray-500 hover:bg-gray-700 hover:text-white transition font-semibold shadow"
      >
        {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>

      <section className="text-center px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-600">
          Master Your Money, The Smart Way
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Welcome to BudgetMate – Your all-in-one personal finance dashboard. Track expenses, create budgets, and gain full control of your financial life.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/login" className="bg-purple-600 text-white px-6 py-3 rounded font-semibold">
            Login
          </Link>
          <Link to="/register" className="bg-green-500 text-white px-6 py-3 rounded font-semibold">
            Get Started
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-8 py-16">
        <div className={`rounded-xl shadow-md p-6 text-center ${
          darkMode ? 'bg-[#2c2c2c]' : 'bg-white'
        }`}>
          <h3 className="text-xl font-bold text-purple-600 mb-2">📊 Real-Time Insights</h3>
          <p>Track your expenses and income in real-time with beautiful charts and graphs.</p>
        </div>
        <div className={`rounded-xl shadow-md p-6 text-center ${
          darkMode ? 'bg-[#2c2c2c]' : 'bg-white'
        }`}>
          <h3 className="text-xl font-bold text-purple-600 mb-2">💡 Smart Budgeting</h3>
          <p>Create monthly budgets, set goals, and get intelligent tips to save more.</p>
        </div>
        <div className={`rounded-xl shadow-md p-6 text-center ${
          darkMode ? 'bg-[#2c2c2c]' : 'bg-white'
        }`}>
          <h3 className="text-xl font-bold text-purple-600 mb-2">🔐 Secure & Private</h3>
          <p>All your data is encrypted and stored securely — only you can access it.</p>
        </div>
        <div className={`rounded-xl shadow-md p-6 text-center ${
          darkMode ? 'bg-[#2c2c2c]' : 'bg-white'
        }`}>
          <h3 className="text-xl font-bold text-purple-600 mb-2">📁 Easy Export</h3>
          <p>Export your financial reports in CSV or PDF formats for your own records.</p>
        </div>
      </section>

      <footer className={`text-center py-6 text-sm ${
        darkMode ? 'bg-[#2a2a2a] text-gray-300' : 'bg-white text-gray-500'
      }`}>
        &copy; 2025 BudgetMate. Designed with 💜 for smarter finance.
      </footer>
    </div>
  );
};

export default Homepage;
