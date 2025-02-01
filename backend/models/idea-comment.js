const mongoose = require("../config/dbConfig");

const ideaCommentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ideaId: { type: mongoose.Schema.Types.ObjectId, ref: "Idea", required: true },
    comment: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("IdeaComment", ideaCommentSchema);
