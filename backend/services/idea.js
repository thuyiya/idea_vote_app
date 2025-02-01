const Idea = require('../models/idea');

async function createIdea(ideaData, userId) {
    try {
        const {
            title,
            description
        } = ideaData;

        const createIdea = new Idea({
            userId,
            title,
            description
        })

        const saveIdea = await createIdea.save();
        return saveIdea;
    } catch (error) {
        console.log(error)
        throw error
    }
}

async function getAllIdeas() {
    try {
        const ideas = await Idea.find({})
        return ideas;
    } catch (error) {
        console.log(error)
        throw error
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
        console.log(error);
        throw error;
    }
}



module.exports = {
    getAllIdeas,
    createIdea,
    removeIdea
}