import axiosInstance from "./axiosInstance";

const API_URL = "/ideas";

// Fetch all ideas
export const fetchIdeas = async () => {
    return axiosInstance.get(`${API_URL}/all`);
};

// Create a new idea
export const createIdea = async (idea: { title: string; description: string; userId: string; status: string }) => {
    return axiosInstance.post(`${API_URL}/create`, idea);
};

// Update an existing idea
export const updateIdea = async (ideaId: string, idea: { title: string; description: string; status: string }) => {
    return axiosInstance.put(`${API_URL}/${ideaId}/status`, idea);
};

// Delete an idea
export const deleteIdea = async (ideaId: string) => {
    return axiosInstance.delete(`${API_URL}/${ideaId}`);
};
