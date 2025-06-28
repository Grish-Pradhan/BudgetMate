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
      className={`min-h-screen flex flex-col items-center px-6 pt-10 transition-colors duration-300
        ${darkMode ? 'bg-[#121212] text-[#e0e0e0]' : 'bg-[#f5f6fa] text-[#2d3436]'}
      `}
    >
      <main
        className={`relative max-w-xl w-full rounded-2xl p-10 shadow-xl transition-colors duration-300
          ${darkMode
            ? 'bg-[#1e1e1e] shadow-[#bb86fc]/50'
            : 'bg-white shadow-[#6c5ce7]/30'
          }
        `}
      >
        {/* Dark mode toggle inside main, top right */}
        <button
          onClick={() => setDarkMode(prev => !prev)}
          className={`absolute top-4 right-4 px-4 py-2 rounded-md font-semibold cursor-pointer
            transition-colors duration-300
            ${darkMode
              ? 'bg-transparent border border-[#bb86fc] text-[#e0e0e0] hover:bg-[#bb86fc] hover:text-[#121212]'
              : 'bg-transparent border border-[#6c5ce7] text-[#2d3436] hover:bg-[#6c5ce7] hover:text-white'
            }
          `}
          aria-label="Toggle dark mode"
        >
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>

        <h1 className="text-4xl font-extrabold text-purple-600 mb-10 text-center">
          Get in Touch
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="name"
              className={`block mb-3 font-semibold
                ${darkMode ? 'text-[#d3c4fc]' : 'text-gray-700'}
              `}
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
              className={`${inputClasses} w-full
                ${darkMode
                  ? 'text-[#e0e0e0] placeholder-[#9f94c9] border-[#555] focus:border-[#bb86fc]'
                  : 'text-[#2d3436] placeholder-gray-500 border-gray-300 focus:border-[#6c5ce7]'
                }
              `}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className={`block mb-3 font-semibold
                ${darkMode ? 'text-[#d3c4fc]' : 'text-gray-700'}
              `}
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
              className={`${inputClasses} w-full
                ${darkMode
                  ? 'text-[#e0e0e0] placeholder-[#9f94c9] border-[#555] focus:border-[#bb86fc]'
                  : 'text-[#2d3436] placeholder-gray-500 border-gray-300 focus:border-[#6c5ce7]'
                }
              `}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className={`block mb-3 font-semibold
                ${darkMode ? 'text-[#d3c4fc]' : 'text-gray-700'}
              `}
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
              className={`${inputClasses} resize-none w-full
                ${darkMode
                  ? 'text-[#e0e0e0] placeholder-[#9f94c9] border-[#555] focus:border-[#bb86fc]'
                  : 'text-[#2d3436] placeholder-gray-500 border-gray-300 focus:border-[#6c5ce7]'
                }
              `}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-4 rounded-lg font-bold shadow-lg transition-colors duration-300
              ${darkMode
                ? 'bg-[#bb86fc] hover:bg-[#9f6de0] text-[#121212]'
                : 'bg-[#6c5ce7] hover:bg-[#594dcf] text-white'
              }
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