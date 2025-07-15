import React, { useState, useEffect } from 'react';
import { getUsersApi, getTransactionsApi } from '../api/Api';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [errorUsers, setErrorUsers] = useState(null);
  const [errorTransactions, setErrorTransactions] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState('all');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('adminDarkMode') === 'true');

  useEffect(() => {
    localStorage.setItem('adminDarkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsersApi();
        const usersArray =
          Array.isArray(res.data) ? res.data :
          Array.isArray(res.data.users) ? res.data.users :
          Array.isArray(res.data.data) ? res.data.data :
          [];
        setUsers(usersArray);
      } catch (error) {
        setErrorUsers('Failed to fetch users');
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoadingTransactions(true);
      setErrorTransactions(null);
      try {
        const res = await getTransactionsApi();
        const txArray =
          Array.isArray(res.data) ? res.data :
          Array.isArray(res.data.transactions) ? res.data.transactions :
          Array.isArray(res.data.data) ? res.data.data :
          [];

        const filtered = selectedUserId === 'all'
          ? txArray
          : txArray.filter(tx => String(tx.userId ?? tx.user_id) === String(selectedUserId));

        setTransactions(filtered);
      } catch (error) {
        setErrorTransactions('Failed to fetch transactions');
        setTransactions([]);
      } finally {
        setLoadingTransactions(false);
      }
    };

    fetchTransactions();
  }, [selectedUserId]);

  const formatMySQLTimestamp = (timestamp) => {
    if (!timestamp) return '—';
    return new Date(timestamp).toLocaleString();
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // or your token key
    window.location.href = '/';  // Redirect to home page
  };

  return (
    <div className={`min-h-screen p-4 sm:p-8 font-sans transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-900'}`}>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-purple-600 dark:text-purple-400">Admin Dashboard</h1>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => setDarkMode(prev => !prev)}
            aria-label="Toggle dark mode"
            className="px-4 py-2 rounded-md font-semibold border-2 border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-400 dark:hover:text-gray-900 transition"
          >
            {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
          <button
            onClick={handleLogout}
            aria-label="Logout"
            className="px-4 py-2 rounded-md font-semibold border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Users Section */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mb-10 transition-colors duration-300 max-w-full overflow-x-auto">
        <h2 className="text-xl sm:text-2xl font-semibold text-purple-600 dark:text-purple-400 mb-4 border-b-4 border-purple-600 dark:border-purple-400 pb-2">
          Users
        </h2>

        {loadingUsers && <p className="italic text-gray-500 dark:text-gray-400 mb-4">Loading users...</p>}
        {errorUsers && <p className="text-red-600 dark:text-red-400 mb-4">{errorUsers}</p>}

        {!loadingUsers && !errorUsers && (
          <>
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="mb-6 w-full max-w-xs p-2 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400 transition"
            >
              <option value="all">All Users</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name || user.email || `User ${user.id}`}
                </option>
              ))}
            </select>

            <table className="w-full table-auto border-collapse text-left text-sm min-w-[600px]">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="p-3 border border-purple-700">ID</th>
                  <th className="p-3 border border-purple-700">Name</th>
                  <th className="p-3 border border-purple-700">Email</th>
                  <th className="p-3 border border-purple-700">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500 dark:text-gray-400 italic">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map(user => (
                    <tr
                      key={user.id}
                      className="hover:bg-purple-100 dark:hover:bg-purple-900 cursor-default transition-colors"
                    >
                      <td className="p-3 border border-gray-300 dark:border-gray-700">{user.id}</td>
                      <td className="p-3 border border-gray-300 dark:border-gray-700">{user.name || '—'}</td>
                      <td className="p-3 border border-gray-300 dark:border-gray-700">{user.email || '—'}</td>
                      <td className="p-3 border border-gray-300 dark:border-gray-700">{user.role || '—'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </>
        )}
      </section>

      {/* Transactions Section */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 transition-colors duration-300 max-w-full overflow-x-auto">
        <h2 className="text-xl sm:text-2xl font-semibold text-purple-600 dark:text-purple-400 mb-4 border-b-4 border-purple-600 dark:border-purple-400 pb-2">
          Transactions
        </h2>

        {loadingTransactions && <p className="italic text-gray-500 dark:text-gray-400 mb-4">Loading transactions...</p>}
        {errorTransactions && <p className="text-red-600 dark:text-red-400 mb-4">{errorTransactions}</p>}

        {!loadingTransactions && !errorTransactions && (
          <table className="w-full table-auto border-collapse text-left text-sm min-w-[700px]">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="p-3 border border-purple-700">ID</th>
                <th className="p-3 border border-purple-700">Type</th>
                <th className="p-3 border border-purple-700">Description</th>
                <th className="p-3 border border-purple-700">Amount</th>
                <th className="p-3 border border-purple-700">User ID</th>
                <th className="p-3 border border-purple-700">Time Of Entry</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500 dark:text-gray-400 italic">
                    No transactions found for this user.
                  </td>
                </tr>
              ) : (
                transactions.map(tx => (
                  <tr
                    key={tx.id}
                    className="hover:bg-purple-100 dark:hover:bg-purple-900 cursor-default transition-colors"
                  >
                    <td className="p-3 border border-gray-300 dark:border-gray-700">{tx.id}</td>
                    <td className="p-3 border border-gray-300 dark:border-gray-700">{tx.type}</td>
                    <td className="p-3 border border-gray-300 dark:border-gray-700">{tx.description}</td>
                    <td className="p-3 border border-gray-300 dark:border-gray-700">{tx.amount}</td>
                    <td className="p-3 border border-gray-300 dark:border-gray-700">{tx.userId ?? tx.user_id ?? '—'}</td>
                    <td className="p-3 border border-gray-300 dark:border-gray-700">{formatMySQLTimestamp(tx.timeOfEntry ?? tx.createdAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
//grish