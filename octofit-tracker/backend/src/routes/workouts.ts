import { Router, Request, Response } from 'express';
import { Workout } from '../models/Workout.js';

const router = Router();

// Get all suggested workouts
router.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().populate('suggestedFor');
    res.json({
      message: 'Get all suggested workouts',
      data: workouts
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// Get workout by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findById(id).populate('suggestedFor');
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({
      message: `Get workout with ID: ${id}`,
      data: workout
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

// Get personalized workout suggestions for a user
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const workouts = await Workout.find({ suggestedFor: userId }).populate('suggestedFor');
    res.json({
      message: `Get personalized workouts for user: ${userId}`,
      data: workouts
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch personalized workouts' });
  }
});

// Create new workout
router.post('/', async (req: Request, res: Response) => {
  try {
    const workout = new Workout(req.body);
    await workout.save();
    res.status(201).json({
      message: 'Workout created successfully',
      data: workout
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create workout' });
  }
});

// Update workout
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findByIdAndUpdate(id, req.body, { new: true }).populate('suggestedFor');
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({
      message: `Workout with ID: ${id} updated successfully`,
      data: workout
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update workout' });
  }
});

// Delete workout
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({
      message: `Workout with ID: ${id} deleted successfully`
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

export default router;
