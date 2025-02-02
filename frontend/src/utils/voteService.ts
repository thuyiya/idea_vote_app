import axiosInstance from "./axiosInstance";

const API_URL = "/votes";

// Fetch all ideas
export const fetchVotes = async () => {
    return axiosInstance.get(`${API_URL}/all`);
};

export const fetchBestVoteIdeas = async () => {
    return axiosInstance.get(`${API_URL}/best`);
};

export const fetchMyVotes = async () => {
    return axiosInstance.get(`${API_URL}`);
};

export const createVote = async (ideaId: string) => {
    return axiosInstance.post(`${API_URL}/create`, { ideaId });
};