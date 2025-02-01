const mongoose = require("../config/dbConfig");

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    ideaId: { type: mongoose.Schema.Types.ObjectId, ref: "Idea", required: true },
    voteId: { type: mongoose.Schema.Types.ObjectId, ref: "Vote" },  // Can be null if not related to a vote
    status: {
        type: String,
        enum: ['Read', 'Not-Read'],
        default: 'Not-Read'
    }
}, { timestamps: true });

module.exports = mongoose.model("Notification", notificationSchema);
