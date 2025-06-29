import React, { useEffect, useState } from 'react';
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

  // Fetch users once on mount
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
        console.error('Error fetching users:', error);
        setErrorUsers('Failed to fetch users');
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  // Fetch transactions whenever selectedUserId changes
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoadingTransactions(true);
      setErrorTransactions(null);
      try {
        const res = await getTransactionsApi();
        console.log('Raw transactions API response:', res.data);

        const txArray =
          Array.isArray(res.data) ? res.data :
          Array.isArray(res.data.transactions) ? res.data.transactions :
          Array.isArray(res.data.data) ? res.data.data :
          [];

        console.log('Extracted transactions array length:', txArray.length);

        // If you want to filter by userId on frontend (works only if backend returns all transactions)
        const filtered = selectedUserId === 'all'
          ? txArray
          : txArray.filter(tx => String(tx.userId ?? tx.user_id) === String(selectedUserId));

        console.log('Filtered transactions length:', filtered.length);

        setTransactions(filtered);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setErrorTransactions('Failed to fetch transactions');
        setTransactions([]);
      } finally {
        setLoadingTransactions(false);
      }
    };

    fetchTransactions();
  }, [selectedUserId]);

  useEffect(() => {
    localStorage.setItem('adminDarkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const formatMySQLTimestamp = (timestamp) => {
    if (!timestamp) return '—';
    return new Date(timestamp).toLocaleString();
  };

  const styles = {
    container: {
      padding: '2rem',
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: darkMode ? '#121212' : '#f5f6fa',
      color: darkMode ? '#e0e0e0' : '#2d3436',
      minHeight: '100vh',
      width: '100%',
      margin: 0,
      transition: 'background-color 0.3s, color 0.3s',
    },
    toggleDark: {
      float: 'right',
      marginBottom: '1rem',
      cursor: 'pointer',
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '1.2rem',
      color: darkMode ? '#e0e0e0' : '#2d3436',
    },
    title: {
      textAlign: 'center',
      fontSize: '2.5rem',
      marginBottom: '2rem',
      fontWeight: '700',
      color: darkMode ? '#bb86fc' : '#6c5ce7',
    },
    section: {
      backgroundColor: darkMode ? '#1e1e1e' : '#fff',
      borderRadius: '10px',
      padding: '1.5rem',
      marginBottom: '2rem',
      boxShadow: darkMode
        ? '0 2px 8px rgb(255 255 255 / 0.1)'
        : '0 2px 8px rgb(0 0 0 / 0.1)',
      transition: 'background-color 0.3s, box-shadow 0.3s',
    },
    sectionTitle: {
      fontSize: '1.8rem',
      marginBottom: '1rem',
      borderBottom: `3px solid ${darkMode ? '#bb86fc' : '#6c5ce7'}`,
      paddingBottom: '0.3rem',
      fontWeight: '600',
      color: darkMode ? '#bb86fc' : '#6c5ce7',
    },
    selectUser: {
      marginBottom: '1.5rem',
      padding: '0.6rem 1rem',
      fontSize: '1rem',
      borderRadius: '8px',
      border: darkMode ? '1px solid #555' : '1px solid #ccc',
      width: 320,
      outline: 'none',
      backgroundColor: darkMode ? '#2c2c2c' : '#fff',
      color: darkMode ? '#e0e0e0' : '#2d3436',
      transition: 'background-color 0.3s, border-color 0.3s, color 0.3s',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    thead: {
      backgroundColor: darkMode ? '#3700b3' : '#6c5ce7',
      color: 'white',
      fontWeight: '600',
    },
    th: {
      padding: '12px 15px',
      textAlign: 'left',
      borderBottom: darkMode ? '2px solid #555' : '2px solid #ddd',
    },
    td: {
      padding: '12px 15px',
      textAlign: 'left',
      borderBottom: darkMode ? '1px solid #444' : '1px solid #eee',
      verticalAlign: 'middle',
      color: darkMode ? '#e0e0e0' : '#2d3436',
    },
    trHover: {
      cursor: 'default',
      backgroundColor: darkMode ? '#333366' : '#f1f8ff',
      transition: 'background-color 0.3s',
    },
    loadingText: {
      fontStyle: 'italic',
      color: darkMode ? '#bbb' : '#555',
      marginBottom: 12,
      textAlign: 'center',
    },
    errorText: {
      color: '#d63031',
      fontWeight: '600',
      marginBottom: 12,
      textAlign: 'center',
    },
    noData: {
      textAlign: 'center',
      color: darkMode ? '#888' : '#999',
      fontStyle: 'italic',
      padding: '20px 0',
    },
  };

  return (
    <div style={styles.container}>
      <button
        style={styles.toggleDark}
        onClick={() => setDarkMode(prev => !prev)}
        aria-label="Toggle dark mode"
      >
        {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>

      <h1 style={styles.title}>Admin Dashboard</h1>

      {/* Users Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Users</h2>
        {loadingUsers && <p style={styles.loadingText}>Loading users...</p>}
        {errorUsers && <p style={styles.errorText}>{errorUsers}</p>}
        {!loadingUsers && !errorUsers && (
          <>
            <select
              style={styles.selectUser}
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="all">All Users</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name || user.email || `User ${user.id}`}
                </option>
              ))}
            </select>

            <table style={styles.table}>
              <thead style={styles.thead}>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={styles.noData}>No users found.</td>
                  </tr>
                ) : (
                  users.map(user => (
                    <tr
                      key={user.id}
                      style={{ cursor: 'default' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = styles.trHover.backgroundColor}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = ''}
                    >
                      <td style={styles.td}>{user.id}</td>
                      <td style={styles.td}>{user.name || '—'}</td>
                      <td style={styles.td}>{user.email || '—'}</td>
                      <td style={styles.td}>{user.role || '—'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </>
        )}
      </section>

      {/* Transactions Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Transactions</h2>
        {loadingTransactions && <p style={styles.loadingText}>Loading transactions...</p>}
        {errorTransactions && <p style={styles.errorText}>{errorTransactions}</p>}
        {!loadingTransactions && !errorTransactions && (
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>User ID</th>
                <th style={styles.th}>Time Of Entry</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="6" style={styles.noData}>
                    No transactions found for this user.
                  </td>
                </tr>
              ) : (
                transactions.map(tx => (
                  <tr
                    key={tx.id}
                    style={{ cursor: 'default' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = styles.trHover.backgroundColor}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = ''}
                  >
                    <td style={styles.td}>{tx.id}</td>
                    <td style={styles.td}>{tx.type}</td>
                    <td style={styles.td}>{tx.description}</td>
                    <td style={styles.td}>{tx.amount}</td>
                    <td style={styles.td}>{tx.userId ?? tx.user_id ?? '—'}</td>
                    <td style={styles.td}>{formatMySQLTimestamp(tx.timeOfEntry ?? tx.createdAt)}</td>
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
//Grish Pradhan