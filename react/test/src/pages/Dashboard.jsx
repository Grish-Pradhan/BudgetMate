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
  const chartRef = useRef(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);

  const authHeader = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
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
  }, []);

  useEffect(() => {
    updateChart();
  }, [updateChart]);

  // === Styles ===
  const styles = {
    container: {
      padding: '1rem',
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: darkMode ? '#1e272e' : '#f5f6fa',
      color: darkMode ? '#f1f2f6' : '#2d3436',
      minHeight: '100vh',
    },
    title: { textAlign: 'center', fontSize: '2rem', marginBottom: '1rem' },
    totals: { display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', marginBottom: '1rem' },
    totalCard: {
      backgroundColor: darkMode ? '#2f3640' : '#fff',
      padding: '1rem', margin: '0.5rem', borderRadius: '10px',
      flex: '1 1 30%', textAlign: 'center', minWidth: '120px',
    },
    section: {
      display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
    },
    card: {
      backgroundColor: darkMode ? '#2f3640' : '#fff',
      padding: '1rem', margin: '1rem 0.5rem', borderRadius: '10px',
      flex: '1 1 45%', minWidth: '280px',
    },
    input: {
      display: 'block', width: '100%', padding: '0.5rem', margin: '0.5rem 0',
      borderRadius: '5px', border: '1px solid #ccc',
      fontSize: '1rem', backgroundColor: darkMode ? '#485460' : '#fff',
      color: darkMode ? '#f1f2f6' : '#2d3436',
    },
    button: {
      padding: '0.5rem 1rem', margin: '0.5rem 0',
      backgroundColor: '#6c5ce7', color: '#fff',
      border: 'none', borderRadius: '5px', cursor: adding ? 'wait' : 'pointer',
      fontSize: '1rem',
    },
    chartCard: {
      padding: '1rem', backgroundColor: darkMode ? '#2f3640' : '#fff',
      borderRadius: '10px', margin: '1rem 0', height: '300px', position: 'relative',
    },
    exportButtons: {
      display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem',
    },
    toggleDark: {
      float: 'right', marginBottom: '1rem', cursor: 'pointer',
      backgroundColor: 'transparent', border: 'none',
      fontSize: '1.2rem', color: darkMode ? '#f1f2f6' : '#2d3436',
    },
  };

  return (
    <div style={styles.container}>
      <button style={styles.toggleDark} onClick={() => setDarkMode(prev => !prev)}>
        {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>

      <h1 style={styles.title}><strong>💸 Income & Expense Tracker</strong></h1>

      <div style={styles.totals}>
        <div style={styles.totalCard}><strong>Total Income:</strong> Rs {totalIncome.toFixed(2)}</div>
        <div style={styles.totalCard}><strong>Total Spent:</strong> Rs {totalSpent.toFixed(2)}</div>
        <div style={styles.totalCard}><strong>Remaining:</strong> Rs {remaining.toFixed(2)}</div>
      </div>

      <div style={styles.section}>
        <div style={styles.card}>
          <h2>Add Income</h2>
          <input
            style={styles.input}
            placeholder="💼 Source"
            value={incomeSource}
            onChange={e => setIncomeSource(e.target.value)}
            disabled={adding}
          />
          <input
            style={styles.input}
            placeholder="💰 Amount"
            type="number"
            value={incomeAmount}
            onChange={e => setIncomeAmount(e.target.value)}
            disabled={adding}
          />
          <button style={styles.button} onClick={addIncome} disabled={adding}>
            ➕ Add Income
          </button>
        </div>

        <div style={styles.card}>
          <h2>Add Expense</h2>
          <input
            style={styles.input}
            placeholder="📝 Topic"
            value={topic}
            onChange={e => setTopic(e.target.value)}
            disabled={adding}
          />
          <input
            style={styles.input}
            placeholder="💵 Cost per item"
            type="number"
            value={cost}
            onChange={e => setCost(e.target.value)}
            disabled={adding}
          />
          <input
            style={styles.input}
            placeholder="🔁 How many times?"
            type="number"
            value={times}
            onChange={e => setTimes(e.target.value)}
            disabled={adding}
          />
          <button style={styles.button} onClick={addExpense} disabled={adding}>
            ➕ Add Expense
          </button>
        </div>
      </div>

      <div style={styles.card}>
        <label htmlFor="chartType">📊 Choose Chart Type</label>
        <select
          id="chartType"
          style={styles.input}
          value={chartType}
          onChange={e => setChartType(e.target.value)}
          disabled={adding}
        >
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
        </select>
        <button style={styles.button} onClick={updateChart} disabled={adding}>
          Update Chart
        </button>
      </div>

      <div style={styles.chartCard}>
        {loading ? (
          <p>Loading chart...</p>
        ) : (
          <canvas id="expenseChart"></canvas>
        )}
      </div>

      <div style={styles.exportButtons}>
        <button style={styles.button} onClick={exportCSV} disabled={loading || !transactions.length}>
          📁 Export as CSV
        </button>
        <button style={styles.button} onClick={exportPDF} disabled={loading || !transactions.length}>
          📄 Export as PDF
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
//Grish Pradhan