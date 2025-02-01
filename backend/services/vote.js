const Vote = require('../models/vote');

async function createVote(userId, ideaId) {
    try {
        const existingVote = await Vote.findOne({ userId, ideaId });
        if (existingVote) {
            throw new Error("User has already voted for this idea.");
        }

        const vote = new Vote({ userId, ideaId });
        await vote.save();

        // Optionally, you can update the idea with the vote count
        return vote;
    } catch (error) {
        throw error;
    }
}

async function getVotesForIdea(ideaId) {
    try {
        const voteCount = await Vote.countDocuments({ ideaId });
        return voteCount;
    } catch (error) {
        throw error;
    }
}

async function removeVote(id) {
    try {
        const vote = await Vote.deleteOne({ _id: id });
        if (!vote) {
            throw new Error("Vote not found");
        }
        return vote;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createVote,
    getVotesForIdea,
    removeVote
};
