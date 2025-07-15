import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserApi } from '../api/Api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [darkMode, setDarkMode] = React.useState(() => localStorage.getItem('adminDarkMode') === 'true');
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    localStorage.setItem('adminDarkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return toast.error('Please fill in all fields.');
    setLoading(true);
    try {
      const data = { name, email, password, role: 'user' };
      const response = await createUserApi(data);

      if (response?.data?.message) {
        toast.success(response.data.message);
        setTimeout(() => navigate('/login'), 1500);
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('❌ Registration error:', error);
      toast.error(error?.response?.data?.message || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = `
    border
    rounded-md
    p-4
    focus:outline-none
    focus:ring-4
    focus:ring-purple-500
    transition
    bg-transparent
    shadow-sm
  `;

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
        darkMode ? 'bg-[#121212] text-[#e0e0e0]' : 'bg-[#f5f6fa] text-[#2d3436]'
      } font-sans`}
    >
      <div
        className={`relative flex flex-col gap-8 w-full max-w-2xl p-12 rounded-2xl shadow-xl transition-colors duration-300 ${
          darkMode ? 'bg-[#1e1e1e] shadow-[#bb86fc]/50' : 'bg-white shadow-[#6c5ce7]/30'
        }`}
        style={{ paddingTop: '5.5rem' }} // space for toggle button
      >
        {/* Dark Mode Toggle Button */}
        <button
          type="button"
          onClick={() => setDarkMode((prev) => !prev)}
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

        <h1 className="text-4xl font-extrabold text-[#6c5ce7] dark:text-[#bb86fc] text-center">
          Create New Account
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => {
              const filtered = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '');
              setName(filtered);
            }}
            disabled={loading}
            required
            className={`${inputClasses} w-full ${
              darkMode
                ? 'text-[#e0e0e0] placeholder-[#9f94c9] border-[#555] focus:border-[#bb86fc]'
                : 'text-[#2d3436] placeholder-gray-500 border-gray-300 focus:border-[#6c5ce7]'
            }`}
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
            className={`${inputClasses} w-full ${
              darkMode
                ? 'text-[#e0e0e0] placeholder-[#9f94c9] border-[#555] focus:border-[#bb86fc]'
                : 'text-[#2d3436] placeholder-gray-500 border-gray-300 focus:border-[#6c5ce7]'
            }`}
          />

          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
            minLength={5}
            className={`${inputClasses} w-full ${
              darkMode
                ? 'text-[#e0e0e0] placeholder-[#9f94c9] border-[#555] focus:border-[#bb86fc]'
                : 'text-[#2d3436] placeholder-gray-500 border-gray-300 focus:border-[#6c5ce7]'
            }`}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6c5ce7] hover:bg-[#594dcf] disabled:opacity-50 text-white font-semibold py-3 rounded-md transition"
          >
            {loading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="font-semibold text-[#6c5ce7] dark:text-[#bb86fc] hover:underline">
            Log In
          </a>
        </p>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme={darkMode ? 'dark' : 'light'} />
    </div>
  );
}

export default Register;
