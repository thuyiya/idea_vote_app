const mongoose = require("../config/dbConfig");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['admin', 'manager', 'staff'], default: 'staff' },
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema);