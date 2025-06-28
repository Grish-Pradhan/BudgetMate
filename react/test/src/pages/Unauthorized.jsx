import React from 'react';

const Unauthorized = () => {
  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '1rem',
      backgroundColor: '#121212',
      color: '#e0e0e0',
      fontFamily: "'Poppins', sans-serif",
    },
    title: {
      fontSize: '1.875rem', // 3xl
      fontWeight: '700',
      color: '#f87171', // red-ish
      marginBottom: '1rem',
    },
    message: {
      fontSize: '1.125rem', // lg
      marginBottom: '0.5rem',
      color: '#d1d5db',
    },
    warning: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#fbbf24', // amber/yellow
      marginBottom: '1rem',
    },
    link: {
      marginTop: '1.5rem',
      display: 'inline-block',
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      textDecoration: 'none',
      cursor: 'pointer',
      border: 'none',
      transition: 'background-color 0.2s ease-in-out',
    },
    linkHover: {
      backgroundColor: '#1e40af',
    },
  };

  const [hover, setHover] = React.useState(false);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🚫 Unauthorized</h1>
      <p style={styles.message}>You do not have permission to access this page.</p>
      <p style={styles.warning}>⚠️ Grish ko Property</p>
      <a
        href="/"
        style={{ ...styles.link, ...(hover ? styles.linkHover : {}) }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        Go Home
      </a>
    </div>
  );
};

export default Unauthorized;
//Grish Pradhan