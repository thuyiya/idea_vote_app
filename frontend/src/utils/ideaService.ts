import { IdeaStatus } from "../types";
import axiosInstance from "./axiosInstance";

const API_URL = "/ideas";

// Fetch all ideas
export const fetchIdeas = async () => {
    return axiosInstance.get(`${API_URL}/all`);
};

export const fetchIdeasByStatus = async (status: IdeaStatus) => {
    return axiosInstance.get(`${API_URL}/all/${status}`);
};

// Create a new idea
export const createIdea = async (idea: { title: string; description: string; userId: string; status: string }) => {
    return axiosInstance.post(`${API_URL}/create`, idea);
};

// Update an existing idea
export const updateIdeaStatus = async (ideaId: string, status: IdeaStatus, comment: string) => {
    return axiosInstance.put(`${API_URL}/${ideaId}/status`, { status, comment });
};

export const updateIdea = async (ideaId: string, idea: { title: string; description: string }) => {
    return axiosInstance.put(`${API_URL}/${ideaId}`, idea);
};

// Delete an idea
export const deleteIdea = async (ideaId: string) => {
    return axiosInstance.delete(`${API_URL}/${ideaId}`);
};
