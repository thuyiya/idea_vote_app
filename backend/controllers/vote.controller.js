const voteService = require('../services/vote');

const createVote = async (req, res) => {
    try {
        const { ideaId } = req.body;
        const userId = req.user._id;

        const vote = await voteService.createVote(userId, ideaId);
        res.status(201).json(vote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getVotesForIdea = async (req, res) => {
    try {
        const { ideaId } = req.params;
        const voteCount = await voteService.getVotesForIdea(ideaId);
        res.status(200).json({ ideaId, voteCount });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const removeVote = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const vote = await voteService.removeVote(id);
        res.status(200).json({ message: "Vote removed successfully", vote });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllVotes = async (req, res) => {
    try {
        const votes = await voteService.getAllVotes();
        res.status(200).json(votes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getMyVotes = async (req, res) => {
    try {
        const votes = await voteService.getMyVotes(req.user._id);
        res.status(200).json(votes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getBestIdeasByVotes = async (req, res) => {
    try {
        const votes = await voteService.getBestIdeasByVotes();
        res.status(200).json(votes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createVote,
    getVotesForIdea,
    removeVote,
    getAllVotes,
    getBestIdeasByVotes,
    getMyVotes
};
