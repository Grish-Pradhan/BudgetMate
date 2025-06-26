import React from 'react';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold text-red-600 mb-4">🚫 Unauthorized</h1>
      <p className="text-lg text-gray-700">You do not have permission to access this page.</p>
      <a
        href="/"
        className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
      >
        Go Home
      </a>
    </div>
  );
};

export default Unauthorized;
