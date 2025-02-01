"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const VoteSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    ideaId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Idea', required: true },
    voteType: { type: String, enum: ['Up', 'Down'], required: true },
    createdAt: { type: Date, default: Date.now },
});
exports.default = mongoose_1.default.model('Vote', VoteSchema);
