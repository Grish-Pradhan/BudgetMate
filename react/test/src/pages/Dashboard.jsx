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

  // Load transactions and totals from localStorage on mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      const parsed = JSON.parse(savedTransactions);
      setTransactions(parsed);

      let income = 0, spent = 0;
      parsed.forEach(t => {
        if (t.type === 'Income') income += t.amount;
        else if (t.type === 'Expense') spent += t.amount;
      });
      setTotalIncome(income);
      setTotalSpent(spent);
      setRemaining(income - spent);
    }
  }, []);

  // Save transactions to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Save darkMode to localStorage on change
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Chart update function
  const updateChart = useCallback(() => {
    if (chartRef.current) chartRef.current.destroy();

    const ctx = document.getElementById('expenseChart').getContext('2d');
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
  }, [chartType, totalIncome, totalSpent, remaining]);

  useEffect(() => {
    updateChart();
  }, [darkMode, updateChart]);

  // Add income handler
  const addIncome = () => {
    if (incomeSource && incomeAmount) {
      const amount = parseFloat(incomeAmount);
      setTotalIncome(prev => prev + amount);
      setRemaining(prev => prev + amount);
      setTransactions(prev => [...prev, { type: 'Income', source: incomeSource, amount }]);
      setIncomeSource('');
      setIncomeAmount('');
    }
  };

  // Add expense handler
  const addExpense = () => {
    if (topic && cost && times) {
      const amount = parseFloat(cost) * parseInt(times, 10);
      setTotalSpent(prev => prev + amount);
      setRemaining(prev => prev - amount);
      setTransactions(prev => [...prev, { type: 'Expense', topic, amount }]);
      setTopic('');
      setCost('');
      setTimes('');
    }
  };

  // Export CSV
  const exportCSV = () => {
    const csvContent = 'data:text/csv;charset=utf-8,Type,Description,Amount\n' +
      transactions.map(t => `${t.type},${t.source || t.topic},${t.amount}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Income & Expense Report', 10, 10);
    transactions.forEach((t, i) => {
      doc.text(`${i + 1}. ${t.type}: ${t.source || t.topic} - Rs ${t.amount}`, 10, 20 + i * 10);
    });
    doc.save('transactions.pdf');
  };

  // Styles (unchanged, omitted here for brevity, use your existing styles object)
  const styles = {
    container: {
      padding: '1rem',
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: darkMode ? '#1e272e' : '#f5f6fa',
      color: darkMode ? '#f1f2f6' : '#2d3436',
      minHeight: '100vh',
    },
    title: {
      textAlign: 'center',
      fontSize: '2rem',
      marginBottom: '1rem',
    },
    totals: {
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      marginBottom: '1rem',
    },
    totalCard: {
      backgroundColor: darkMode ? '#2f3640' : '#fff',
      padding: '1rem',
      margin: '0.5rem',
      borderRadius: '10px',
      flex: '1 1 30%',
      textAlign: 'center',
      minWidth: '120px',
    },
    section: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '1rem',
    },
    card: {
      backgroundColor: darkMode ? '#2f3640' : '#fff',
      padding: '1rem',
      margin: '1rem 0.5rem',
      borderRadius: '10px',
      flex: '1 1 45%',
      minWidth: '280px',
    },
    input: {
      display: 'block',
      width: '100%',
      padding: '0.5rem',
      margin: '0.5rem 0',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '1rem',
      backgroundColor: darkMode ? '#485460' : '#fff',
      color: darkMode ? '#f1f2f6' : '#2d3436',
    },
    button: {
      padding: '0.5rem 1rem',
      margin: '0.5rem 0',
      backgroundColor: '#6c5ce7',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'background-color 0.3s ease',
    },
    chartCard: {
      padding: '1rem',
      backgroundColor: darkMode ? '#2f3640' : '#fff',
      borderRadius: '10px',
      margin: '1rem 0',
      height: '300px', 
      position: 'relative',
    },
    exportButtons: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: '1rem',
    },
    toggleDark: {
      float: 'right',
      marginBottom: '1rem',
      cursor: 'pointer',
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '1.2rem',
      color: darkMode ? '#f1f2f6' : '#2d3436',
    },
  };

  return (
    <div style={styles.container}>
      <button
        style={styles.toggleDark}
        onClick={() => setDarkMode(prev => !prev)}
        aria-label="Toggle Dark Mode"
      >
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
          />
          <input
            style={styles.input}
            placeholder="💰 Amount"
            type="number"
            value={incomeAmount}
            onChange={e => setIncomeAmount(e.target.value)}
          />
          <button style={styles.button} onClick={addIncome}>➕ Add Income</button>
        </div>

        <div style={styles.card}>
          <h2>Add Expense</h2>
          <input
            style={styles.input}
            placeholder="📝 Topic"
            value={topic}
            onChange={e => setTopic(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="💵 Cost per item"
            type="number"
            value={cost}
            onChange={e => setCost(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="🔁 How many times?"
            type="number"
            value={times}
            onChange={e => setTimes(e.target.value)}
          />
          <button style={styles.button} onClick={addExpense}>➕ Add Expense</button>
        </div>
      </div>

      <div style={styles.card}>
        <label htmlFor="chartType">📊 Choose Chart Type</label>
        <select
          id="chartType"
          style={styles.input}
          value={chartType}
          onChange={e => setChartType(e.target.value)}
        >
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
        </select>
        <button style={styles.button} onClick={updateChart}>Update Chart</button>
      </div>

      <div style={styles.chartCard}>
        <canvas id="expenseChart"></canvas>
      </div>

      <div style={styles.exportButtons}>
        <button style={styles.button} onClick={exportCSV}>📁 Export as CSV</button>
        <button style={styles.button} onClick={exportPDF}>📄 Export as PDF</button>
      </div>
    </div>
  );
};

export default Dashboard;
