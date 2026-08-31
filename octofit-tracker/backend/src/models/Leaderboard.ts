import { Schema, model } from 'mongoose';

interface ILeaderboardEntry {
  userId: Schema.Types.ObjectId;
  rank: number;
  points: number;
  teamId?: Schema.Types.ObjectId;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  rank: { type: Number, required: true },
  points: { type: Number, required: true },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', optional: true },
  updatedAt: { type: Date, default: Date.now }
});

export const Leaderboard = model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
export type { ILeaderboardEntry };
