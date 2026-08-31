import { Schema, model } from 'mongoose';

interface IWorkout {
  title: string;
  description: string;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  suggestedFor?: Schema.Types.ObjectId[];
  createdAt: Date;
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true }, // in minutes
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  suggestedFor: [{ type: Schema.Types.ObjectId, ref: 'User', optional: true }],
  createdAt: { type: Date, default: Date.now }
});

export const Workout = model<IWorkout>('Workout', workoutSchema);
export type { IWorkout };
