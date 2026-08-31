import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

// Codespaces-aware API URL support
const CODESPACE_NAME = process.env.CODESPACE_NAME;

const getApiUrl = (): string => {
  if (CODESPACE_NAME) {
    // Build Codespaces URL: https://{CODESPACE_NAME}-8000.app.github.dev
    return `https://${CODESPACE_NAME}-8000.app.github.dev`;
  }
  // Fallback to localhost
  return `http://localhost:${PORT}`;
};

const API_URL = getApiUrl();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'OctoFit Tracker API is running',
    apiUrl: API_URL,
    environment: process.env.NODE_ENV || 'development',
    codespaceName: CODESPACE_NAME || 'not-in-codespaces'
  });
});

// Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API URL: ${API_URL}`);
  if (CODESPACE_NAME) {
    console.log(`✅ Codespaces detected: ${CODESPACE_NAME}`);
    console.log(`📱 Codespaces backend URL: https://${CODESPACE_NAME}-8000.app.github.dev`);
  } else {
    console.log(`📍 Running locally on http://localhost:${PORT}`);
  }
  console.log(`MongoDB connection string: ${MONGODB_URI}`);
});

export default app;
