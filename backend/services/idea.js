const Idea = require('../models/idea');
const Notification = require('../models/notification');

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
        const ideas = await Idea.find({});
        return ideas;
    } catch (error) {
        throw error;
    }
}

async function updateIdeaStatus(ideaId, status) {
    try {
        const validStatuses = ['Approved', 'Rejected', 'Neutral'];
        if (!validStatuses.includes(status)) {
            throw new Error("Invalid status");
        }

        const updatedIdea = await Idea.findByIdAndUpdate(ideaId, { status }, { new: true });
        if (!updatedIdea) {
            throw new Error("Idea not found");
        }

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