import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUserApi } from '../api/Api'; // Replace with your actual API path
import { useNavigate } from 'react-router-dom'; // ✅ For redirecting

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const submit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in both fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await loginUserApi({ email, password });

      if (response?.data?.token) {
        localStorage.setItem('token', response.data.token);
        toast.success('Login successful!');
        navigate('/dashboard'); // ✅ Redirect to dashboard
      } else {
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      toast.error(error?.response?.data?.message || 'Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    'border border-amber-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-amber-400 transition bg-transparent';

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
        darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
      }`}
    >
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className="fixed top-4 right-4 z-50 px-4 py-2 rounded-md border border-gray-500 hover:bg-gray-700 hover:text-white transition font-semibold shadow"
      >
        {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>

      {/* Login Form */}
      <form
        onSubmit={submit}
        className={`flex flex-col gap-4 w-full max-w-md p-8 rounded-lg shadow-lg transition-colors duration-300 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h2 className="text-2xl font-bold mb-2 text-center">Login to Your Account</h2>

        <input
          type="email"
          name="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          className={`${inputClasses} ${
            darkMode ? 'text-gray-100 placeholder-gray-400' : 'text-gray-900 placeholder-gray-600'
          }`}
          disabled={loading}
          required
        />

        <input
          type="password"
          name="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          className={`${inputClasses} ${
            darkMode ? 'text-gray-100 placeholder-gray-400' : 'text-gray-900 placeholder-gray-600'
          }`}
          disabled={loading}
          required
          minLength={5} // ✅ Minimum password length set to 5
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-lg font-bold transition shadow-lg disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="text-sm mt-2 flex justify-between text-blue-500">
          <a href="/forgot-password" className="hover:underline">
            Forgot Password?
          </a>
          <a href="/register" className="hover:underline">
            Create an Account
          </a>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default Login;
