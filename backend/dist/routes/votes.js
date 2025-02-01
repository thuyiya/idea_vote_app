"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Vote_1 = __importDefault(require("../models/Vote"));
const Idea_1 = __importDefault(require("../models/Idea"));
const router = express_1.default.Router();
// Create a new vote
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, ideaId, voteType } = req.body;
    try {
        const idea = yield Idea_1.default.findById(ideaId);
        if (!idea) {
            res.status(404).json({ error: 'Idea not found' });
        }
        const existingVote = yield Vote_1.default.findOne({ userId, ideaId });
        if (existingVote) {
            res.status(400).json({ error: 'User has already voted on this idea' });
        }
        const newVote = new Vote_1.default({ userId, ideaId, voteType });
        yield newVote.save();
        res.status(201).json(newVote); // Make sure to return the response
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to register vote' });
    }
}));
// Get all votes for an idea
router.get('/:ideaId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ideaId } = req.params;
    try {
        const votes = yield Vote_1.default.find({ ideaId }).populate('userId');
        res.json(votes); // Make sure to return the response
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch votes' });
    }
}));
exports.default = router;
