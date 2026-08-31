import { Router, Request, Response } from 'express';
import { Leaderboard } from '../models/Leaderboard.js';

const router = Router();

// Get global leaderboard
router.get('/', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ rank: 1 }).populate('userId').populate('teamId');
    res.json({
      message: 'Get global leaderboard',
      data: leaderboard
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Get team leaderboard
router.get('/team/:teamId', async (req: Request, res: Response) => {
  try {
    const { teamId } = req.params;
    const leaderboard = await Leaderboard.find({ teamId }).sort({ rank: 1 }).populate('userId');
    res.json({
      message: `Get leaderboard for team: ${teamId}`,
      data: leaderboard
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team leaderboard' });
  }
});

// Get user rank
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const entry = await Leaderboard.findOne({ userId }).populate('userId').populate('teamId');
    if (!entry) {
      return res.status(404).json({ error: 'User not found in leaderboard' });
    }
    res.json({
      message: `Get rank for user: ${userId}`,
      data: entry
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user rank' });
  }
});

export default router;
