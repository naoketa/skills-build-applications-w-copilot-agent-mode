import React, { useState, useEffect } from 'react';

export function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true);
        
        // Build API URL with Codespaces support
        let apiUrl;
        if (import.meta.env.VITE_CODESPACE_NAME && import.meta.env.VITE_CODESPACE_NAME !== 'undefined') {
          apiUrl = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
        } else {
          apiUrl = 'http://localhost:8000/api/activities/';
        }
        
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        
        // Handle both paginated and array response formats
        const activitiesList = Array.isArray(data) ? data : (data.data || []);
        setActivities(activitiesList);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Failed to load activities:', err);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  if (loading) return <div className="alert alert-info">Loading activities...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h2>🏃 Activities</h2>
      {activities.length === 0 ? (
        <p>No activities found</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Distance (km)</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id}>
                  <td>{activity.userId?.name || 'Unknown'}</td>
                  <td>
                    <span className="badge bg-info">{activity.type}</span>
                  </td>
                  <td>{activity.duration}</td>
                  <td>{activity.distance || '-'}</td>
                  <td>{activity.calories}</td>
                  <td>{new Date(activity.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
