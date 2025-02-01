const ideaService = require('../services/idea');

const createIdea = async (req, res) => {
    try {
        const ideaData = req.body
        console.log(req.user)
        const idea = await ideaService.createIdea(ideaData, req.user._id);
        res.status(201).json(idea)
    } catch (error) {
       res.status(400).json({ message: "Create idea error"}) 
    }
}

const getAllIdeas = async (req, res) => {
    try {
        const ideas = await ideaService.getAllIdeas();
        res.status(201).json(ideas)
    } catch (error) {
        res.status(400).json({ message: "get ideas error" })
    }
}

const removeIdea = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const idea = await ideaService.removeIdea(id, userId);
        res.status(200).json({ message: "Idea removed successfully", idea });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateIdeaStatus = async (req, res) => {
    try {
        const { ideaId } = req.params;
        const { status } = req.body; // The new status passed in the request body

        const updatedIdea = await ideaService.updateIdeaStatus(ideaId, status);
        res.status(200).json({ message: "Idea status updated", idea: updatedIdea });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


module.exports = {
    createIdea,
    getAllIdeas,
    removeIdea,
    updateIdeaStatus
}