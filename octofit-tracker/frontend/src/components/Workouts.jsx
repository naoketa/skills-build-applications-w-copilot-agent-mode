import React, { useState, useEffect } from 'react';
import { fetchFromApi, extractDataArray } from '../api';

export function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        setLoading(true);
        const response = await fetchFromApi('/api/workouts');
        const data = extractDataArray(response);
        setWorkouts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Failed to load workouts:', err);
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  if (loading) return <div className="alert alert-info">Loading workouts...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h2>💪 Workout Suggestions</h2>
      {workouts.length === 0 ? (
        <p>No workouts found</p>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout._id} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{workout.title}</h5>
                  <p className="card-text">{workout.description}</p>
                  <div className="mb-3">
                    <p>
                      <strong>Duration:</strong> {workout.duration} minutes
                    </p>
                    <p>
                      <strong>Difficulty:</strong>{' '}
                      <span
                        className={`badge bg-${
                          workout.difficulty === 'easy'
                            ? 'success'
                            : workout.difficulty === 'medium'
                              ? 'warning'
                              : 'danger'
                        }`}
                      >
                        {workout.difficulty.charAt(0).toUpperCase() +
                          workout.difficulty.slice(1)}
                      </span>
                    </p>
                    <p>
                      <strong>Suggested for:</strong>{' '}
                      {workout.suggestedFor?.length || 0} users
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
