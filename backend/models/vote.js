const mongoose = require("../config/dbConfig");

const voteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ideaId: { type: mongoose.Schema.Types.ObjectId, ref: "Idea", required: true },
}, { timestamps: true })

module.exports = mongoose.model("Vote", voteSchema);
