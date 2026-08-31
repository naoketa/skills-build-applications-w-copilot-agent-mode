import { Schema, model } from 'mongoose';

interface IActivity {
  userId: Schema.Types.ObjectId;
  type: string;
  duration: number;
  distance?: number;
  calories: number;
  date: Date;
  createdAt: Date;
}

const activitySchema = new Schema<IActivity>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true }, // e.g., 'running', 'cycling', 'swimming', 'workout'
  duration: { type: Number, required: true }, // in minutes
  distance: { type: Number, optional: true }, // in kilometers
  calories: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

export const Activity = model<IActivity>('Activity', activitySchema);
export type { IActivity };
