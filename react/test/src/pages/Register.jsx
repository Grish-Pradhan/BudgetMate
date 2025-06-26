import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserApi } from '../api/Api';
import { useNavigate } from 'react-router-dom';  // <-- Import useNavigate

function Register() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [darkMode, setDarkMode] = React.useState(() => localStorage.getItem('darkMode') === 'true');
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();  // <-- Initialize navigate

  React.useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const inputClasses =
    'border border-amber-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-amber-400 transition bg-transparent';

  const submit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return toast.error('Please fill in all fields.');
    }
    setLoading(true);
    try {
      const data = { name, email, password };
      const response = await createUserApi(data);

      if (response?.data?.message) {
        toast.success(response.data.message);
        // Redirect after short delay to show toast
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
        darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-900'
      }`}
    >
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-md border transition font-semibold shadow ${
          darkMode
            ? 'border-gray-400 hover:bg-gray-700 hover:text-white text-gray-200'
            : 'border-gray-600 hover:bg-gray-300 hover:text-gray-900 text-gray-900'
        }`}
      >
        {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>

      {/* Register Form */}
      <form
        onSubmit={submit}
        className={`flex flex-col gap-4 w-full max-w-md p-8 rounded-lg shadow-md transition-colors duration-300 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h2 className="text-2xl font-bold mb-2 text-center">Create an Account</h2>

        <input
          type="text"
          name="username"
          value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          className={`${inputClasses} ${
            darkMode ? 'text-gray-100 placeholder-gray-400 border-gray-600' : 'text-gray-900 placeholder-gray-600'
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
          className={`${inputClasses} ${
            darkMode ? 'text-gray-100 placeholder-gray-400 border-gray-600' : 'text-gray-900 placeholder-gray-600'
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
            darkMode ? 'text-gray-100 placeholder-gray-400 border-gray-600' : 'text-gray-900 placeholder-gray-600'
          }`}
          disabled={loading}
          required
          minLength={5}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-lg font-bold transition shadow-lg disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default Register;
