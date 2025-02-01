const Vote = require('../models/vote');
const Notification = require('../models/notification');

async function createVote(userId, ideaId) {
    try {
        const existingVote = await Vote.findOne({ userId, ideaId });
        if (existingVote) {
            throw new Error("User has already voted for this idea.");
        }

        const vote = new Vote({ userId, ideaId });
        const savedVote = await vote.save();

        // Create notification for the relevant user
        const notification = new Notification({
            userId: ideaId,  // Notify the user who created the idea
            title: "New Vote on Your Idea",
            description: `Your idea titled '${savedVote.ideaId}' has received a new vote.`,
            ideaId: savedVote.ideaId,
            voteId: savedVote._id,  // Link to the vote
            status: 'Not-Read',
        });

        await notification.save();
        // Optionally, you can update the idea with the vote count
        return savedVote;
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
