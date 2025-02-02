import axiosInstance from "./axiosInstance";

const API_URL = "/votes";

// Fetch all ideas
export const fetchVotes = async () => {
    return axiosInstance.get(`${API_URL}/all`);
};

export const fetchBestVoteIdeas = async () => {
    return axiosInstance.get(`${API_URL}/best`);
};