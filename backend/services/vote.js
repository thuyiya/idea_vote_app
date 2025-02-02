const Vote = require('../models/vote');
const Idea = require('../models/idea');
const Notification = require('../models/notification');

async function createVote(userId, ideaId) {
    try {
        const existingVote = await Vote.findOne({ userId, ideaId });
        if (existingVote) {
            // Remove vote
            await Vote.deleteOne({ _id: existingVote._id });

            // Remove notification related to this vote
            await Notification.deleteOne({ voteId: existingVote._id });

            return { message: "Vote removed successfully." };
        }

        // Create new vote
        const vote = new Vote({ userId, ideaId });
        const savedVote = await vote.save();

        // Create notification for the relevant user
        const ideaOwner = await Idea.findById(ideaId); // Assuming the Idea model exists
        if (!ideaOwner) {
            throw new Error("Idea not found");
        }

        const notification = new Notification({
            userId: ideaOwner.userId, // Notify the user who created the idea
            title: "New Vote on Your Idea",
            description: `Your idea titled '${ideaOwner.title}' has received a new vote.`,
            ideaId: savedVote.ideaId,
            voteId: savedVote._id, // Link to the vote
            status: "Not-Read",
        });

        await notification.save();

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

async function getAllVotes() {
    try {
        const votes = await Vote.find({});
        return votes;
    } catch (error) {
        throw error;
    }
}

async function getMyVotes(id) {
    try {
        const votes = await Vote.find({ userId : id});
        return votes;
    } catch (error) {
        throw error;
    }
}

async function getBestIdeasByVotes() {
    try {
        // Step 1: Aggregate votes by ideaId
        const votesAggregation = await Vote.aggregate([
            {
                $group: {
                    _id: "$ideaId",  // Group by ideaId
                    voteCount: { $sum: 1 }  // Count the number of votes for each idea
                }
            },
            {
                $sort: { voteCount: -1 }  // Sort by vote count in descending order
            },
            {
                $limit: 5  // Limit the result to top 5 ideas
            }
        ]);

        // Step 2: Retrieve idea details (title, etc.) from the Idea collection
        const bestIdeas = await Promise.all(
            votesAggregation.map(async (vote) => {
                const idea = await Idea.findById(vote._id).select('title');
                if (!idea) {
                    console.warn(`Idea with ID ${vote._id} not found`);
                    return { title: 'Unknown', votes: vote.voteCount }; // Return 'Unknown' if the idea doesn't exist
                }
                return { title: idea.title, votes: vote.voteCount };
            })
        );

        return bestIdeas;
    } catch (error) {
        console.error("Error fetching best ideas by votes:", error);
        throw error;
    }
}


module.exports = {
    createVote,
    getVotesForIdea,
    removeVote,
    getAllVotes,
    getBestIdeasByVotes,
    getMyVotes
};
