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
        const ideas = await Idea.aggregate([
            // Step 1: Join with the "User" collection using $lookup
            {
                $lookup: {
                    from: "users",  // The name of the user collection in MongoDB
                    localField: "userId",  // Field in Idea collection
                    foreignField: "_id",  // Field in User collection
                    as: "user"  // This will return an array, so we use $unwind to turn it into an object
                }
            },
            // Step 2: Unwind the "user" array to get a single user object (because $lookup returns an array)
            {
                $unwind: "$user"
            },
            // Step 3: Add the vote count for each idea, ensuring votes field exists and is an array
            {
                $addFields: {
                    voteCount: {
                        $size: {
                            $ifNull: [
                                {
                                    $filter: {
                                        input: "$votes", // Assuming you have an array of votes in the Idea document
                                        as: "vote",
                                        cond: { $eq: ["$$vote.ideaId", "$_id"] }  // Filtering votes based on ideaId
                                    }
                                },
                                [] // Default to an empty array if "votes" is null or does not exist
                            ]
                        }
                    }
                }
            },
            // Step 4: Project the desired fields (including the user info)
            {
                $project: {
                    title: 1,
                    description: 1,
                    status: 1,
                    createdAt: 1,
                    userId: 1,
                    updatedAt: 1,
                    voteCount: 1,
                    user: {
                        _id: "$user._id",
                        email: "$user.email"
                    }
                }
            }
        ]);

        return ideas;
    } catch (error) {
        console.log(error)
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

        const ideaComment = new IdeaComment({
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
        console.log("error ", error)
        throw error;
    }
}

async function updateIdea(ideaId, { title, description }) {
    try {
        if (!title || !description) {
            throw new Error("Invalid update");
        }

        const updatedIdea = await Idea.findByIdAndUpdate(ideaId, { title, description }, { new: true });
        if (!updatedIdea) {
            throw new Error("Idea not found");
        }

        // Create notification for the relevant user
        const notification = new Notification({
            userId: updatedIdea.userId, // Notify the user who created the idea
            title: "Idea Updated",
            description: `Idea titled '${updatedIdea.title}' has been updated to '${description}'.`,
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

async function getIdeasByStatus(status) {
    try {
        const idea = await Idea.find({ status });
        return idea;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllIdeas,
    createIdea,
    removeIdea,
    updateIdeaStatus,
    updateIdea,
    getIdeasByStatus
}