import React, { useState, useEffect } from 'react';
import { fetchFromApi, extractDataArray } from '../api';

export function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await fetchFromApi('/api/leaderboard');
        const data = extractDataArray(response);
        setEntries(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Failed to load leaderboard:', err);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  if (loading) return <div className="alert alert-info">Loading leaderboard...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h2>🏅 Leaderboard</h2>
      {entries.length === 0 ? (
        <p>No leaderboard entries found</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Points</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry._id}>
                  <td>
                    <strong>#{entry.rank}</strong>
                  </td>
                  <td>{entry.userId?.name || 'Unknown'}</td>
                  <td>
                    <span className="badge bg-warning text-dark">
                      {entry.points}
                    </span>
                  </td>
                  <td>{entry.teamId?.name || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
