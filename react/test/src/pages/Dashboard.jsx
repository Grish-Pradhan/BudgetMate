import React, { useState, useEffect, useRef, useCallback } from 'react';
import Chart from 'chart.js/auto';
import jsPDF from 'jspdf';

const Dashboard = () => {
  const [incomeSource, setIncomeSource] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');
  const [topic, setTopic] = useState('');
  const [cost, setCost] = useState('');
  const [times, setTimes] = useState('');
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [chartType, setChartType] = useState('bar');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const chartRef = useRef(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [userName, setUserName] = useState('');

  const authHeader = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  };

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/user', { headers: authHeader });
      if (!res.ok) throw new Error('Failed to fetch user');
      const data = await res.json();
      setUserName(data.name || data.username || 'User');
    } catch (err) {
      setUserName('User');
    }
  };

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/transactions', { headers: authHeader });
      if (!res.ok) throw new Error('Failed to fetch transactions');
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error(err);
      alert('Error fetching transactions');
    } finally {
      setLoading(false);
    }
  };

  const fetchTotals = async () => {
    try {
      const res = await fetch('/api/transactions/totals', { headers: authHeader });
      if (!res.ok) throw new Error('Failed to fetch totals');
      const totals = await res.json();

      let income = 0, spent = 0;
      totals.forEach(({ type, total }) => {
        if (type === 'Income') income = parseFloat(total);
        else if (type === 'Expense') spent = parseFloat(total);
      });

      setTotalIncome(income);
      setTotalSpent(spent);
      setRemaining(income - spent);
    } catch (err) {
      console.error(err);
      alert('Error fetching totals');
    }
  };

  const addIncome = async () => {
    if (!incomeSource || !incomeAmount || isNaN(incomeAmount) || incomeAmount <= 0) {
      alert('Please enter a valid income source and amount');
      return;
    }
    try {
      setAdding(true);
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: authHeader,
        body: JSON.stringify({
          type: 'Income',
          description: incomeSource,
          amount: parseFloat(incomeAmount),
        }),
      });
      if (!res.ok) throw new Error('Failed to add income');

      setIncomeSource('');
      setIncomeAmount('');
      await fetchTransactions();
      await fetchTotals();
    } catch (err) {
      console.error(err);
      alert('Error adding income');
    } finally {
      setAdding(false);
    }
  };

  const addExpense = async () => {
    if (!topic || !cost || !times || isNaN(cost) || isNaN(times) || cost <= 0 || times <= 0) {
      alert('Please enter valid expense details');
      return;
    }
    try {
      setAdding(true);
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: authHeader,
        body: JSON.stringify({
          type: 'Expense',
          description: topic,
          amount: parseFloat(cost) * parseInt(times, 10),
        }),
      });
      if (!res.ok) throw new Error('Failed to add expense');

      setTopic('');
      setCost('');
      setTimes('');
      await fetchTransactions();
      await fetchTotals();
    } catch (err) {
      console.error(err);
      alert('Error adding expense');
    } finally {
      setAdding(false);
    }
  };

  const updateChart = useCallback(() => {
    setTimeout(() => {
      const canvas = document.getElementById('expenseChart');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (chartRef.current) chartRef.current.destroy();

      chartRef.current = new Chart(ctx, {
        type: chartType,
        data: {
          labels: ['Income', 'Spent', 'Remaining'],
          datasets: [{
            label: 'Financial Overview',
            data: [totalIncome, totalSpent, remaining],
            backgroundColor: ['#00b894', '#d63031', '#6c5ce7'],
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }, 100);
  }, [chartType, totalIncome, totalSpent, remaining]);

  const exportCSV = () => {
    if (!transactions.length) {
      alert('No transactions to export');
      return;
    }
    const csvContent = 'data:text/csv;charset=utf-8,Type,Description,Amount,Time\n' +
      transactions.map(t => `${t.type},${t.description},${t.amount},${new Date(t.timeOfEntry).toLocaleString()}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportPDF = () => {
    if (!transactions.length) {
      alert('No transactions to export');
      return;
    }
    const doc = new jsPDF();
    doc.setFont('Poppins', 'normal');
    doc.setFontSize(16);
    doc.text('Income & Expense Report', 10, 10);
    transactions.forEach((t, i) => {
      doc.text(`${i + 1}. ${t.type}: ${t.description} - Rs ${t.amount} (${new Date(t.timeOfEntry).toLocaleString()})`, 10, 20 + i * 10);
    });
    doc.save('transactions.pdf');
  };

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    fetchTransactions();
    fetchTotals();
    fetchUser();
  }, []);

  useEffect(() => {
    updateChart();
  }, [updateChart]);

  const sidebarStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: sidebarOpen ? '200px' : '50px',
    height: '100vh',
    backgroundColor: darkMode ? '#2f3640' : '#dfe6e9',
    transition: 'width 0.3s',
    overflow: 'hidden',
    zIndex: 999,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '1rem',
    fontFamily: "'Poppins', sans-serif",
  };

  const sidebarButton = {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    marginBottom: '1rem',
    color: darkMode ? '#fff' : '#2d3436',
    width: '100%',
    textAlign: 'center',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
  };

  const sidebarUser = {
    color: darkMode ? '#fff' : '#2d3436',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    fontSize: '1.1rem',
    textAlign: 'center',
    width: '100%',
    wordBreak: 'break-word',
    fontFamily: "'Poppins', sans-serif",
  };

  const pageContent = {
    marginLeft: sidebarOpen ? '200px' : '50px',
    transition: 'margin-left 0.3s',
    padding: '1rem',
    backgroundColor: darkMode ? '#1e272e' : '#f5f6fa',
    minHeight: '100vh',
    color: darkMode ? '#f1f2f6' : '#2d3436',
    fontFamily: "'Roboto', sans-serif",
  };

  // Container for Income + Expense forms side by side or stacked on narrow screens
  const formsContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  };

  // Individual form box style with min-width to avoid overlap
  const formBoxStyle = {
    backgroundColor: darkMode ? '#2f3640' : '#fff',
    padding: '1rem',
    borderRadius: '10px',
    flex: '1 1 300px', // grow, shrink, base width = 300px
    minWidth: '280px',
    fontFamily: "'Roboto', sans-serif",
  };

  // Input style reused for all inputs
  const inputStyle = {
    fontFamily: "'Roboto', sans-serif",
    display: 'block',
    width: '100%',
    padding: '0.5rem',
    margin: '0.5rem 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    backgroundColor: darkMode ? '#485460' : '#fff',
    color: darkMode ? '#f1f2f6' : '#2d3436',
  };

  // Button style reused
  const buttonStyle = {
    fontFamily: "'Poppins', sans-serif",
    padding: '0.5rem 1rem',
    marginTop: '0.5rem',
    backgroundColor: '#6c5ce7',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: adding ? 'wait' : 'pointer',
    fontSize: '1rem',
    fontWeight: 600,
    width: '100%', // full width so no overlap
  };

  return (
    <div>
      {/* Sidebar */}
      <div style={sidebarStyles}>
        <button style={sidebarButton} onClick={() => setSidebarOpen(prev => !prev)}>
          ☰
        </button>
        {sidebarOpen && (
          <>
            <div style={sidebarUser}>👤 {userName}</div>
            <button style={sidebarButton} onClick={() => setDarkMode(prev => !prev)}>
              {darkMode ? ' Light Mode' : 'Dark Mode'}
            </button>
            <button
              style={sidebarButton}
              onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/login';
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>

      <div style={pageContent}>
        <button
          style={{
            float: 'right',
            marginBottom: '1rem',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '1.2rem',
            color: darkMode ? '#f1f2f6' : '#2d3436',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
          }}
          onClick={() => setDarkMode(prev => !prev)}
        >
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>

        <h1
          style={{
            textAlign: 'center',
            fontSize: '2rem',
            marginBottom: '1rem',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
          }}
        >
          <strong>💸 Income & Expense Tracker</strong>
        </h1>

        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', marginBottom: '1rem' }}>
          {['Total Income', 'Total Spent', 'Remaining'].map((label, idx) => {
            const values = [totalIncome, totalSpent, remaining];
            return (
              <div
                key={label}
                style={{
                  backgroundColor: darkMode ? '#2f3640' : '#fff',
                  padding: '1rem',
                  margin: '0.5rem',
                  borderRadius: '10px',
                  flex: '1 1 30%',
                  textAlign: 'center',
                  minWidth: '120px',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: '1.1rem',
                }}
              >
                <strong>{label}:</strong> Rs {values[idx].toFixed(2)}
              </div>
            );
          })}
        </div>

        {/* Forms container */}
        <div style={formsContainerStyle}>
          {/* Add Income */}
          <div style={formBoxStyle}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>Add Income</h2>
            <input
              style={inputStyle}
              placeholder="💼 Source"
              value={incomeSource}
              onChange={e => setIncomeSource(e.target.value)}
              disabled={adding}
            />
            <input
              style={inputStyle}
              placeholder="💰 Amount"
              type="number"
              value={incomeAmount}
              onChange={e => setIncomeAmount(e.target.value)}
              disabled={adding}
            />
            <button
              style={buttonStyle}
              onClick={addIncome}
              disabled={adding}
              type="button"
            >
              ➕ Add Income
            </button>
          </div>

          {/* Add Expense */}
          <div style={formBoxStyle}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>Add Expense</h2>
            <input
              style={inputStyle}
              placeholder="📝 Topic"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              disabled={adding}
            />
            <input
              style={inputStyle}
              placeholder="💵 Cost per item"
              type="number"
              value={cost}
              onChange={e => setCost(e.target.value)}
              disabled={adding}
            />
            <input
              style={inputStyle}
              placeholder="🔁 How many times?"
              type="number"
              value={times}
              onChange={e => setTimes(e.target.value)}
              disabled={adding}
            />
            <button
              style={buttonStyle}
              onClick={addExpense}
              disabled={adding}
              type="button"
            >
              ➕ Add Expense
            </button>
          </div>
        </div>

        <div
          style={{
            padding: '1rem',
            backgroundColor: darkMode ? '#2f3640' : '#fff',
            borderRadius: '10px',
            margin: '1rem 0',
            height: '300px',
            position: 'relative',
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          <canvas id="expenseChart" style={{ height: '100%', width: '100%' }}></canvas>

          <div
            style={{
              marginTop: '1rem',
              textAlign: 'center',
            }}
          >
            {['bar', 'pie', 'line'].map(type => (
              <label
                key={type}
                style={{
                  marginRight: '10px',
                  cursor: 'pointer',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                }}
              >
                <input
                  type="radio"
                  name="chartType"
                  value={type}
                  checked={chartType === type}
                  onChange={e => setChartType(e.target.value)}
                />{' '}
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button
            onClick={exportCSV}
            style={{
              fontFamily: "'Poppins', sans-serif",
              marginRight: '1rem',
              padding: '0.5rem 1rem',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: '#0984e3',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 600,
              minWidth: '120px',
            }}
            type="button"
          >
            Export CSV
          </button>
          <button
            onClick={exportPDF}
            style={{
              fontFamily: "'Poppins', sans-serif",
              padding: '0.5rem 1rem',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: '#00b894',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 600,
              minWidth: '120px',
            }}
            type="button"
          >
            Export PDF
          </button>
        </div>

        <div
          style={{
            marginTop: '2rem',
            fontFamily: "'Roboto', sans-serif",
            fontSize: '1rem',
            maxHeight: '300px',
            overflowY: 'auto',
            backgroundColor: darkMode ? '#2f3640' : '#fff',
            borderRadius: '10px',
            padding: '1rem',
          }}
        >
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>Transactions</h2>
          {loading ? (
            <p>Loading transactions...</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${darkMode ? '#636e72' : '#ccc'}` }}>
                  <th style={{ padding: '0.5rem', textAlign: 'left' }}>Type</th>
                  <th style={{ padding: '0.5rem', textAlign: 'left' }}>Description</th>
                  <th style={{ padding: '0.5rem', textAlign: 'right' }}>Amount (Rs)</th>
                  <th style={{ padding: '0.5rem', textAlign: 'left' }}>Time</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length ? (
                  transactions.map((t, i) => (
                    <tr
                      key={i}
                      style={{
                        backgroundColor: i % 2 === 0 ? (darkMode ? '#353b48' : '#f7f7f7') : 'transparent',
                      }}
                    >
                      <td style={{ padding: '0.5rem' }}>{t.type}</td>
                      <td style={{ padding: '0.5rem' }}>{t.description}</td>
                      <td style={{ padding: '0.5rem', textAlign: 'right' }}>{t.amount.toFixed(2)}</td>
                      <td style={{ padding: '0.5rem' }}>{new Date(t.timeOfEntry).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '1rem' }}>
                      No transactions yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
