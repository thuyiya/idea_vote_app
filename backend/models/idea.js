const mongoose = require("../config/dbConfig");

const ideaSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
        type: String,
        enum: ['Approved', 'Rejected', 'Neutral'],
        default: 'Neutral'
    }
}, { timestamps: true });

module.exports = mongoose.model("Idea", ideaSchema);
