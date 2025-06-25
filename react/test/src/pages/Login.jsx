import React from 'react';

function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [darkMode, setDarkMode] = React.useState(() => localStorage.getItem('darkMode') === 'true');

  React.useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const submit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please fill in both fields.');
      return;
    }

    // Mock login action (replace with API call)
    alert(`Logging in with:\nEmail: ${email}\nPassword: ${password}`);
  };

  const inputClasses = `border border-amber-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-amber-400 transition bg-transparent`;

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
        />

        <button
          type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-lg font-bold transition shadow-lg"
        >
          Login
        </button>

        <div className="text-sm mt-2 flex justify-between text-blue-500">
          <a href="/register" className="hover:underline">Forgot Password?</a>
          <a href="/register" className="hover:underline">Create an Account</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
