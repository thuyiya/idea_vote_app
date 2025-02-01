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
const Idea_1 = __importDefault(require("../models/Idea"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
// Create a new idea
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, userId } = req.body;
    try {
        const newIdea = new Idea_1.default({ title, description, userId });
        yield newIdea.save();
        res.status(201).json(newIdea);
    }
    catch (err) {
        res.status(400).json({ error: 'Failed to create idea' });
    }
}));
// Get all ideas
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ideas = yield Idea_1.default.find().populate('userId').populate('approvedUserIds');
        res.json(ideas);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch ideas' });
    }
}));
// Update an idea's status (Only admin/manager can approve/reject)
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { status } = req.body;
    const { id } = req.params;
    try {
        // TypeScript now knows `req.user` exists!
        const user = yield User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId);
        if ((user === null || user === void 0 ? void 0 : user.role) !== 'admin' && (user === null || user === void 0 ? void 0 : user.role) !== 'manager') {
            res.status(403).json({ error: 'Only admins or managers can approve or reject ideas' });
            return;
        }
        const idea = yield Idea_1.default.findById(id);
        if (!idea) {
            res.status(404).json({ error: 'Idea not found' });
            return;
        }
        // Update status
        idea.status = status;
        if (status === 'Approved' || status === 'Rejected') {
            idea.updatedAt = new Date();
        }
        // Add user to approvedUserIds
        if (status === 'Approved' && !idea.approvedUserIds.includes(user.id)) {
            idea.approvedUserIds.push(user.id);
        }
        yield idea.save();
        res.json(idea);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to update idea status' });
    }
}));
// Delete an idea
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const idea = yield Idea_1.default.findById(id);
        if (!idea) {
            res.status(404).json({ error: 'Idea not found' });
            return;
        }
        yield Idea_1.default.deleteOne({ _id: idea.id });
        res.json({ message: 'Idea deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to delete idea' });
    }
}));
exports.default = router;
