import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUserApi } from '../api/Api';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('adminDarkMode') === 'true');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('adminDarkMode', darkMode);
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

        const decoded = jwtDecode(response.data.token);

        setTimeout(() => {
          if (decoded.role === 'admin') {
            navigate('/admin-dashboard');
          } else {
            navigate('/dashboard');
          }
        }, 1000);
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
      }`}
    >
      <form
        onSubmit={submit}
        className={`relative flex flex-col gap-8 w-full max-w-2xl p-12 rounded-2xl shadow-xl transition-colors duration-300 ${
          darkMode ? 'bg-[#1e1e1e] shadow-[#bb86fc]/50' : 'bg-white shadow-[#6c5ce7]/30'
        }`}
        style={{ paddingTop: '5.5rem' }} // overlap hatauna padding-top
      >
        {/* Dark Mode Toggle ko lagi */}
        <button
          type="button"
          onClick={() => setDarkMode(prev => !prev)}
          aria-label="Toggle dark mode"
          className={`absolute top-6 right-6 px-5 py-2 rounded-md font-semibold cursor-pointer
            transition-colors duration-300
            ${darkMode
              ? 'bg-transparent border border-[#bb86fc] text-[#e0e0e0] hover:bg-[#bb86fc] hover:text-[#121212]'
              : 'bg-transparent border border-[#6c5ce7] text-[#2d3436] hover:bg-[#6c5ce7] hover:text-white'
            }
          `}
        >
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>

        <h2 className="text-4xl font-extrabold text-purple-600 mb-6 text-center">
          Login to Your Account
        </h2>

        <input
          type="email"
          name="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          className={`${inputClasses} w-full ${
            darkMode
              ? 'text-[#e0e0e0] placeholder-[#9f94c9] border-[#555] focus:border-[#bb86fc]'
              : 'text-[#2d3436] placeholder-gray-500 border-gray-300 focus:border-[#6c5ce7]'
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
          className={`${inputClasses} w-full ${
            darkMode
              ? 'text-[#e0e0e0] placeholder-[#9f94c9] border-[#555] focus:border-[#bb86fc]'
              : 'text-[#2d3436] placeholder-gray-500 border-gray-300 focus:border-[#6c5ce7]'
          }`}
          disabled={loading}
          required
          minLength={5}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-5 rounded-lg font-bold shadow-lg transition-colors duration-300 ${
            darkMode
              ? 'bg-[#bb86fc] hover:bg-[#9f6de0] text-[#121212]'
              : 'bg-[#6c5ce7] hover:bg-[#594dcf] text-white'
          } disabled:opacity-50`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="text-sm mt-4 flex justify-between text-blue-500">
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
//Grish Pradhan