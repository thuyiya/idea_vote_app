const Idea = require('../models/idea');
const Vote = require('../models/vote');
const Notification = require('../models/notification');
const IdeaComment = require('../models/idea-comment');

async function createIdea(ideaData, userId) {
    try {
        const { title, description } = ideaData;

        const createIdea = new Idea({
            userId,
            title,
            description,
            status: 'Neutral'
        });

        const saveIdea = await createIdea.save();

        const notification = new Notification({
            userId: userId,  // Notify the user who created the idea
            title: "New Idea Created",
            description: `Your new idea titled '${saveIdea.title}' has been created.`,
            ideaId: saveIdea._id,
            status: 'Not-Read',
        });

        await notification.save();

        return saveIdea;
    } catch (error) {
        throw error;
    }
}

async function getAllIdeas() {
    try {
        const ideas = await Idea.find({})
            .populate("userId", "name email") // Replace "name email" with the fields you want from the user schema
            .lean(); // Converts Mongoose documents to plain JavaScript objects for easier manipulation

        // Add vote count to each idea
        const ideasWithVotes = await Promise.all(
            ideas.map(async (idea) => {
                const voteCount = await Vote.countDocuments({ ideaId: idea._id }); // Count votes for the idea
                return { ...idea, voteCount }; // Add vote count to the idea object
            })
        );

        return ideasWithVotes;
    } catch (error) {
        throw error;
    }
}

async function updateIdeaStatus(ideaId, status, userId, comment) {
    try {
        const validStatuses = ['Approved', 'Rejected', 'Neutral'];
        if (!validStatuses.includes(status)) {
            throw new Error("Invalid status");
        }

        const updatedIdea = await Idea.findByIdAndUpdate(ideaId, { status }, { new: true });
        if (!updatedIdea) {
            throw new Error("Idea not found");
        }

        const ideaComment = new IdeaComment.create({
            userId,
            ideaId,
            comment: comment || "NO COMMENT ADDED"
        })

        await ideaComment.save();

        // Create notification for the relevant user
        const notification = new Notification({
            userId: updatedIdea.userId, // Notify the user who created the idea
            title: "Idea Status Updated",
            description: `Your idea titled '${updatedIdea.title}' status has been updated to '${status}'.`,
            ideaId: updatedIdea._id,
            status: 'Not-Read',
        });

        await notification.save();

        return updatedIdea;
    } catch (error) {
        throw error;
    }
}

async function removeIdea(ideaId, userId) {
    try {
        const idea = await Idea.findOneAndDelete({ _id: ideaId, userId });
        if (!idea) {
            throw new Error("Idea not found or you are not authorized to delete this idea");
        }
        return idea;
    } catch (error) {
        throw error;
    }
}



module.exports = {
    getAllIdeas,
    createIdea,
    removeIdea,
    updateIdeaStatus
}