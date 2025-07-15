import React from 'react';

function Contact() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
  });

  const [darkMode, setDarkMode] = React.useState(() => localStorage.getItem('adminDarkMode') === 'true');

  React.useEffect(() => {
    localStorage.setItem('adminDarkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
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
    block
    w-full
    rounded-md
    border
    border-gray-300
    dark:border-gray-700
    bg-white
    dark:bg-[#2a2a2a]
    px-4
    py-3
    text-gray-900
    dark:text-gray-100
    placeholder-gray-400
    dark:placeholder-gray-500
    focus:outline-none
    focus:ring-2
    focus:ring-purple-500
    focus:border-transparent
    transition
    shadow-sm
  `;

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-12 transition-colors duration-300 ${
        darkMode ? 'bg-[#121212] text-[#e0e0e0]' : 'bg-[#f5f6fa] text-[#2d3436]'
      } font-sans`}
    >
      <main
        className={`relative w-full max-w-2xl bg-white dark:bg-[#1e1e1e] rounded-3xl p-12 shadow-lg transition-colors duration-300`}
        style={{ paddingTop: '5.5rem' }}
      >
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(prev => !prev)}
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

        <h1 className="text-4xl font-extrabold text-center mb-12 text-[#6c5ce7] dark:text-[#bb86fc]">
          Get in Touch
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className={`block mb-2 font-semibold ${
                darkMode ? 'text-[#d3c4fc]' : 'text-gray-700'
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
              className={inputClasses}
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className={`block mb-2 font-semibold ${
                darkMode ? 'text-[#d3c4fc]' : 'text-gray-700'
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
              className={inputClasses}
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className={`block mb-2 font-semibold ${
                darkMode ? 'text-[#d3c4fc]' : 'text-gray-700'
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
              className={`${inputClasses} resize-none`}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`w-full py-4 rounded-lg font-bold shadow-lg transition-colors duration-300
              ${
                darkMode
                  ? 'bg-[#bb86fc] hover:bg-[#9f6de0] text-[#121212]'
                  : 'bg-[#6c5ce7] hover:bg-[#594dcf] text-white'
              }
              focus:outline-none focus:ring-4 focus:ring-purple-400
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            Send Message
          </button>
        </form>
      </main>
    </div>
  );
}

export default Contact;
//Grish Pradhan