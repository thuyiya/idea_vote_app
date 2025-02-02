import axiosInstance from "./axiosInstance";

const API_URL = "/users";
const API_URL_AUTH = "/auth";


export const getAllEmployees = async () => {
    return axiosInstance.get(`${API_URL}/all`);
};

export const getLastMonthEmployees = async () => {
    return axiosInstance.get(`${API_URL}/lastMonth`);
};

export const logout = async () => {
    return axiosInstance.post(`${API_URL_AUTH}/logout`, {});
};

export const createUser = async (user: { name: string; username: string; email: string; password: string, role: string }) => {
    return axiosInstance.post(`${API_URL}/register`, user);
};

export const getProfile = async () => {
    return axiosInstance.get(`${API_URL}/profile`);
};
