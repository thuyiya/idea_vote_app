const mongoose = require("../config/dbConfig");

const accessTokenSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3600*24 } // Automatically delete after 1 day
});

module.exports = mongoose.model("AccessToken", accessTokenSchema);
