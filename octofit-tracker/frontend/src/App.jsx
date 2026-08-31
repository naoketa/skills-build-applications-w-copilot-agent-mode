import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Users } from './components/Users';
import { Teams } from './components/Teams';
import { Activities } from './components/Activities';
import { Leaderboard } from './components/Leaderboard';
import { Workouts } from './components/Workouts';
import { API_BASE_URL } from './api';
import './App.css';

function Home() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-body text-center">
              <h1 className="card-title">🐙 Octofit Tracker</h1>
              <p className="card-text lead">
                Track your fitness activities and compete with your team!
              </p>
              <div className="mt-4">
                <h5>API Configuration:</h5>
                <p className="text-muted">
                  <strong>Base URL:</strong> {API_BASE_URL}
                </p>
                <p className="text-muted small">
                  📝 Set VITE_CODESPACE_NAME in .env.local for Codespaces
                  support
                </p>
              </div>
              <div className="mt-4">
                <p>Select a section from the navigation menu to get started!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">
              🐙 Octofit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    👥 Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    🏆 Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    🏃 Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    🏅 Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    💪 Workouts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="bg-dark text-white text-center py-4 mt-5">
          <div className="container">
            <p>&copy; 2026 Octofit Tracker. Built with React 19 & Vite.</p>
            <p className="small text-muted">
              API: {API_BASE_URL} | Environment: Codespaces-aware
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
