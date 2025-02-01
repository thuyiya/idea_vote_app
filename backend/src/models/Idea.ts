import mongoose, { Document } from 'mongoose';

export interface IIdea extends Document {
    title: string;
    description: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    userId: string;  // Reference to the user who created the idea
    approvedUserIds: string[]; // Array of userIds (admin/manager) who approved the idea
    createdAt: Date;
    updatedAt: Date;
}

const IdeaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    approvedUserIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IIdea>('Idea', IdeaSchema);
