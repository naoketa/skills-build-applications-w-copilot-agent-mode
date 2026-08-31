import { Schema, model } from 'mongoose';

interface ITeam {
  name: string;
  description: string;
  members: Schema.Types.ObjectId[];
  totalPoints: number;
  createdAt: Date;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  totalPoints: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export const Team = model<ITeam>('Team', teamSchema);
export type { ITeam };
