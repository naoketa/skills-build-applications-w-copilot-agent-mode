import { Router, Request, Response } from 'express';
import { Activity } from '../models/Activity.js';

const router = Router();

// Get all activities
router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('userId');
    res.json({
      message: 'Get all activities',
      data: activities
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// Get activity by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id).populate('userId');
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({
      message: `Get activity with ID: ${id}`,
      data: activity
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

// Log new activity
router.post('/', async (req: Request, res: Response) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json({
      message: 'Activity logged successfully',
      data: activity
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to log activity' });
  }
});

// Update activity
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByIdAndUpdate(id, req.body, { new: true }).populate('userId');
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({
      message: `Activity with ID: ${id} updated successfully`,
      data: activity
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update activity' });
  }
});

// Delete activity
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByIdAndDelete(id);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({
      message: `Activity with ID: ${id} deleted successfully`
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

export default router;
