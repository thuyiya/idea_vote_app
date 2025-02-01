import mongoose, { Document } from 'mongoose';

export interface IVote extends Document {
    userId: string; // User who voted
    ideaId: string; // The idea they voted for
    voteType: 'Up' | 'Down'; // Upvote or downvote
    createdAt: Date;
}

const VoteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ideaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Idea', required: true },
    voteType: { type: String, enum: ['Up', 'Down'], required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IVote>('Vote', VoteSchema);
