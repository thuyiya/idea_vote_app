import axiosInstance from "./axiosInstance";

const API_URL = "/notifications";

// Fetch all ideas
export const fetchNotification = async () => {
    return axiosInstance.get(`${API_URL}/`);
};
