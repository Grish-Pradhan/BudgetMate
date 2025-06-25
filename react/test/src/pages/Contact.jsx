import React from 'react';

function Contact() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
  });

  const [darkMode, setDarkMode] = React.useState(() => localStorage.getItem('darkMode') === 'true');

  React.useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your message has been received.`);
    setFormData({ name: '', email: '', message: '' });
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
      className={`min-h-screen flex flex-col items-center px-6 pt-10 transition-colors duration-300 ${
        darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
      }`}
    >
      {/* Fixed dark mode toggle button top-right */}
      <button
        onClick={() => setDarkMode(prev => !prev)}
        className="fixed top-4 right-4 z-50 px-4 py-2 rounded-md border border-gray-500 hover:bg-gray-700 hover:text-white transition font-semibold shadow"
      >
        {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>

      <main className="max-w-xl w-full">
        <h1 className="text-4xl font-extrabold text-purple-600 mb-10 text-center">
          Get in Touch
        </h1>

        <form
          onSubmit={handleSubmit}
          className={`rounded-2xl shadow-xl p-10 space-y-8 transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 shadow-purple-700/50' : 'bg-white shadow-purple-300/30'
          }`}
        >
          <div>
            <label
              htmlFor="name"
              className={`block mb-3 font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className={`${inputClasses} ${
                darkMode
                  ? 'text-gray-100 placeholder-gray-400 border-gray-600 focus:border-purple-400'
                  : 'text-gray-900 placeholder-gray-500 border-gray-300 focus:border-purple-600'
              } w-full`}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className={`block mb-3 font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className={`${inputClasses} ${
                darkMode
                  ? 'text-gray-100 placeholder-gray-400 border-gray-600 focus:border-purple-400'
                  : 'text-gray-900 placeholder-gray-500 border-gray-300 focus:border-purple-600'
              } w-full`}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className={`block mb-3 font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Write your message here..."
              className={`${inputClasses} resize-none ${
                darkMode
                  ? 'text-gray-100 placeholder-gray-400 border-gray-600 focus:border-purple-400'
                  : 'text-gray-900 placeholder-gray-500 border-gray-300 focus:border-purple-600'
              } w-full`}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-lg font-bold transition shadow-lg"
          >
            Send Message
          </button>
        </form>
      </main>
    </div>
  );
}

export default Contact;
