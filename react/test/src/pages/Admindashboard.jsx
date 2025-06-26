import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/admin/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error fetching users:', err);
      alert('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axios.delete(`/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers((prev) => prev.filter((user) => user.id !== id));
      alert('User deleted successfully');
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading)
    return (
      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <p style={{ fontSize: '1.2rem', color: '#555' }}>Loading users...</p>
      </div>
    );

  return (
    <div
      style={{
        maxWidth: '1000px',
        margin: '2rem auto',
        padding: '2rem',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#333',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          color: '#2c3e50',
          marginBottom: '1rem',
          fontWeight: '700',
        }}
      >
        Admin Dashboard
      </h1>

      <section
        style={{
          textAlign: 'center',
          marginBottom: '2rem',
          color: '#34495e',
          fontSize: '1.1rem',
        }}
      >
        <h2 style={{ marginBottom: '0.5rem' }}>Welcome, Admin!</h2>
        <p>Manage users, view reports, and configure settings from here.</p>
      </section>

      <div>
        <h3
          style={{
            borderBottom: '2px solid #2980b9',
            paddingBottom: '0.5rem',
            marginBottom: '1rem',
            color: '#2980b9',
            fontWeight: '600',
          }}
        >
          User Management
        </h3>

        {Array.isArray(users) && users.length > 0 ? (
          <table
            style={{
              width: '100%',
              borderCollapse: 'separate',
              borderSpacing: '0 10px',
            }}
          >
            <thead>
              <tr>
                {['ID', 'Name', 'Email', 'Role', 'Created At', 'Actions'].map(
                  (header) => (
                    <th
                      key={header}
                      style={{
                        textAlign: 'left',
                        padding: '12px 15px',
                        backgroundColor: '#2980b9',
                        color: 'white',
                        borderRadius: '6px 6px 0 0',
                        fontWeight: '600',
                      }}
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {users.map(({ id, name, email, role, createdAt }) => (
                <tr
                  key={id}
                  style={{
                    backgroundColor: 'white',
                    boxShadow:
                      '0 2px 5px rgba(0, 0, 0, 0.05), inset 0 -1px 0 rgba(0, 0, 0, 0.05)',
                    borderRadius: '6px',
                    marginBottom: '10px',
                  }}
                >
                  <td style={{ padding: '12px 15px' }}>{id}</td>
                  <td style={{ padding: '12px 15px' }}>{name}</td>
                  <td style={{ padding: '12px 15px' }}>{email}</td>
                  <td
                    style={{
                      padding: '12px 15px',
                      textTransform: 'capitalize',
                      fontWeight: '600',
                      color: role === 'admin' ? '#e67e22' : '#2980b9',
                    }}
                  >
                    {role}
                  </td>
                  <td style={{ padding: '12px 15px' }}>
                    {new Date(createdAt).toLocaleString()}
                  </td>
                  <td style={{ padding: '12px 15px' }}>
                    <button
                      onClick={() => deleteUser(id)}
                      style={{
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = '#c0392b')
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = '#e74c3c')
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p
            style={{
              textAlign: 'center',
              fontStyle: 'italic',
              color: '#7f8c8d',
              marginTop: '1rem',
            }}
          >
            No users found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
