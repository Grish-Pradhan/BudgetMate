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

  const inputClasses =
    'border rounded-md p-4 focus:outline-none focus:ring-4 focus:ring-purple-500 transition bg-transparent shadow-sm';

  const submit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return toast.error('Please fill in all fields.');
    }
    setLoading(true);
    try {
      const data = { name, email, password, role: 'user' };
      const response = await createUserApi(data);

      if (response?.data?.message) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('❌ Error submitting form:', error);
      toast.error(error?.response?.data?.message || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
        darkMode ? 'bg-[#121212] text-[#e0e0e0]' : 'bg-[#f5f6fa] text-[#2d3436]'
      }`}
    >
      <form
        onSubmit={submit}
        className={`relative flex flex-col gap-6 w-full max-w-lg p-10 rounded-2xl shadow-xl transition-colors duration-300 ${
          darkMode ? 'bg-[#1e1e1e] shadow-[#bb86fc]/50' : 'bg-white shadow-[#6c5ce7]/30'
        }`}
        style={{ paddingTop: '4.8rem' }} // overlap hatauna padding-top
      >
        {/* Dark Mode Toggle lai*/}
        <button
          type="button"
          onClick={() => setDarkMode((prev) => !prev)}
          aria-label="Toggle dark mode"
          className={`absolute top-4 right-4 px-4 py-2 rounded-md font-semibold cursor-pointer
            transition-colors duration-300
            ${darkMode
              ? 'bg-transparent border border-[#bb86fc] text-[#e0e0e0] hover:bg-[#bb86fc] hover:text-[#121212]'
              : 'bg-transparent border border-[#6c5ce7] text-[#2d3436] hover:bg-[#6c5ce7] hover:text-white'
            }
          `}
        >
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>

        <h2 className="text-3xl font-extrabold text-purple-600 mb-6 text-center">
          Create an Account
        </h2>

        <input
          type="text"
          name="username"
          value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          className={`${inputClasses} w-full ${
            darkMode
              ? 'text-[#e0e0e0] placeholder-[#9f94c9] border-[#555] focus:border-[#bb86fc]'
              : 'text-[#2d3436] placeholder-gray-500 border-gray-300 focus:border-[#6c5ce7]'
          }`}
          disabled={loading}
          required
        />
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
          className={`w-full py-4 rounded-lg font-bold shadow-lg transition-colors duration-300 ${
            darkMode
              ? 'bg-[#bb86fc] hover:bg-[#9f6de0] text-[#121212]'
              : 'bg-[#6c5ce7] hover:bg-[#594dcf] text-white'
          } disabled:opacity-50`}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        {/* Login redirect */}
        <p
          className={`mt-4 text-center text-sm ${
            darkMode ? 'text-purple-300' : 'text-purple-600'
          }`}
        >
          Already have an account?{' '}
          <a
            href="/login"
            className="underline font-semibold hover:text-purple-800 transition-colors duration-200"
          >
            Login
          </a>
        </p>
      </form>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default Register;
//Grish Pradhan