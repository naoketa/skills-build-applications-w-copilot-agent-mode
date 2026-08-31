import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { Team } from '../models/Team.js';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({})
    ]);
    console.log('Cleared existing data');

    // Create teams
    const teams = await Team.insertMany([
      {
        name: 'The Fit Octo',
        description: 'A team of dedicated fitness enthusiasts',
        totalPoints: 0
      },
      {
        name: 'Swift Swimmers',
        description: 'Water sports enthusiasts',
        totalPoints: 0
      },
      {
        name: 'Mountain Runners',
        description: 'Trail and mountain running team',
        totalPoints: 0
      }
    ]);
    console.log(`Created ${teams.length} teams`);

    // Create users
    const users = await User.insertMany([
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        activityPoints: 1250,
        teamId: teams[0]._id
      },
      {
        name: 'Bob Smith',
        email: 'bob@example.com',
        activityPoints: 980,
        teamId: teams[0]._id
      },
      {
        name: 'Carol Davis',
        email: 'carol@example.com',
        activityPoints: 1450,
        teamId: teams[1]._id
      },
      {
        name: 'David Wilson',
        email: 'david@example.com',
        activityPoints: 875,
        teamId: teams[1]._id
      },
      {
        name: 'Emma Taylor',
        email: 'emma@example.com',
        activityPoints: 1620,
        teamId: teams[2]._id
      },
      {
        name: 'Frank Martinez',
        email: 'frank@example.com',
        activityPoints: 1100,
        teamId: teams[2]._id
      }
    ]);
    console.log(`Created ${users.length} users`);

    // Update teams with members
    await Team.updateMany({}, [
      {
        $set: {
          members: { $cond: [{ $eq: ['$_id', teams[0]._id] }, [users[0]._id, users[1]._id], '$members'] }
        }
      },
      {
        $set: {
          members: { $cond: [{ $eq: ['$_id', teams[1]._id] }, [users[2]._id, users[3]._id], '$members'] }
        }
      },
      {
        $set: {
          members: { $cond: [{ $eq: ['$_id', teams[2]._id] }, [users[4]._id, users[5]._id], '$members'] }
        }
      }
    ]);

    // Create activities
    const activityTypes = ['running', 'cycling', 'swimming', 'yoga', 'workout'];
    const activities = await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'running',
        duration: 45,
        distance: 8.5,
        calories: 620,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        userId: users[0]._id,
        type: 'cycling',
        duration: 60,
        distance: 25,
        calories: 550,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        userId: users[1]._id,
        type: 'swimming',
        duration: 30,
        distance: 1.5,
        calories: 350,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        userId: users[2]._id,
        type: 'yoga',
        duration: 60,
        calories: 280,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      },
      {
        userId: users[2]._id,
        type: 'running',
        duration: 50,
        distance: 9.2,
        calories: 680,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        userId: users[3]._id,
        type: 'workout',
        duration: 45,
        calories: 420,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        userId: users[4]._id,
        type: 'running',
        duration: 75,
        distance: 14,
        calories: 850,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        userId: users[4]._id,
        type: 'cycling',
        duration: 90,
        distance: 35,
        calories: 700,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        userId: users[5]._id,
        type: 'running',
        duration: 40,
        distance: 7.5,
        calories: 550,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      }
    ]);
    console.log(`Created ${activities.length} activities`);

    // Create leaderboard entries
    const leaderboardEntries = await Leaderboard.insertMany([
      {
        userId: users[4]._id,
        rank: 1,
        points: 1620,
        teamId: teams[2]._id
      },
      {
        userId: users[2]._id,
        rank: 2,
        points: 1450,
        teamId: teams[1]._id
      },
      {
        userId: users[0]._id,
        rank: 3,
        points: 1250,
        teamId: teams[0]._id
      },
      {
        userId: users[5]._id,
        rank: 4,
        points: 1100,
        teamId: teams[2]._id
      },
      {
        userId: users[1]._id,
        rank: 5,
        points: 980,
        teamId: teams[0]._id
      },
      {
        userId: users[3]._id,
        rank: 6,
        points: 875,
        teamId: teams[1]._id
      }
    ]);
    console.log(`Created ${leaderboardEntries.length} leaderboard entries`);

    // Create workouts
    const workouts = await Workout.insertMany([
      {
        title: 'Morning Jog',
        description: 'Easy 5km jog to warm up the day',
        duration: 30,
        difficulty: 'easy',
        suggestedFor: [users[0]._id, users[1]._id]
      },
      {
        title: 'HIIT Cardio Blast',
        description: 'High-intensity interval training for maximum calorie burn',
        duration: 30,
        difficulty: 'hard',
        suggestedFor: [users[4]._id, users[0]._id]
      },
      {
        title: 'Yoga Flow',
        description: 'Relaxing yoga session for flexibility and mindfulness',
        duration: 60,
        difficulty: 'easy',
        suggestedFor: [users[2]._id, users[3]._id]
      },
      {
        title: 'Mountain Trail Run',
        description: 'Challenging trail run for advanced runners',
        duration: 90,
        difficulty: 'hard',
        suggestedFor: [users[4]._id, users[5]._id]
      },
      {
        title: 'Swimming Laps',
        description: 'Full-body swimming workout in the pool',
        duration: 45,
        difficulty: 'medium',
        suggestedFor: [users[1]._id, users[2]._id]
      }
    ]);
    console.log(`Created ${workouts.length} workouts`);

    console.log('✅ Database seeding complete!');
    console.log(`Summary:
      - Teams: ${teams.length}
      - Users: ${users.length}
      - Activities: ${activities.length}
      - Leaderboard entries: ${leaderboardEntries.length}
      - Workouts: ${workouts.length}
    `);
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
