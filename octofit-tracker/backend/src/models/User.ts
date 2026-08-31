import { Schema, model } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  password?: string;
  activityPoints: number;
  teamId?: Schema.Types.ObjectId;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  activityPoints: { type: Number, default: 0 },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', optional: true },
  createdAt: { type: Date, default: Date.now }
});

export const User = model<IUser>('User', userSchema);
export type { IUser };
