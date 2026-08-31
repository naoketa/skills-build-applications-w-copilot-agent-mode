import React, { useState, useEffect } from 'react';

export function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        
        // Build API URL with Codespaces support
        let apiUrl;
        if (import.meta.env.VITE_CODESPACE_NAME && import.meta.env.VITE_CODESPACE_NAME !== 'undefined') {
          apiUrl = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
        } else {
          apiUrl = 'http://localhost:8000/api/users/';
        }
        
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        
        // Handle both paginated and array response formats
        const usersList = Array.isArray(data) ? data : (data.data || []);
        setUsers(usersList);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Failed to load users:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) return <div className="alert alert-info">Loading users...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h2>👥 Users</h2>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Activity Points</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className="badge bg-primary">{user.activityPoints}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
