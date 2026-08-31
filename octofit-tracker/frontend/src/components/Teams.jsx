import React, { useState, useEffect } from 'react';
import { fetchFromApi, extractDataArray } from '../api';

export function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        setLoading(true);
        const response = await fetchFromApi('/api/teams');
        const data = extractDataArray(response);
        setTeams(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Failed to load teams:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  if (loading) return <div className="alert alert-info">Loading teams...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h2>🏆 Teams</h2>
      {teams.length === 0 ? (
        <p>No teams found</p>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div key={team._id} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">{team.description}</p>
                  <p>
                    <strong>Members:</strong> {team.members?.length || 0}
                  </p>
                  <p>
                    <strong>Total Points:</strong>{' '}
                    <span className="badge bg-success">{team.totalPoints}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
