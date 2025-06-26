import React from 'react';

const Admindashboard = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h1>Admin Dashboard</h1>
            <section>
                <h2>Welcome, Admin!</h2>
                <p>Use the dashboard to manage users, view reports, and configure settings.</p>
            </section>
            <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
                <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', flex: 1 }}>
                    <h3>User Management</h3>
                    <ul>
                        <li>View Users</li>
                        <li>Add User</li>
                        <li>Edit User</li>
                    </ul>
                </div>
                <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', flex: 1 }}>
                    <h3>Reports</h3>
                    <ul>
                        <li>View Activity Logs</li>
                        <li>Download Reports</li>
                    </ul>
                </div>
                <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', flex: 1 }}>
                    <h3>Settings</h3>
                    <ul>
                        <li>Site Configuration</li>
                        <li>Permissions</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Admindashboard;