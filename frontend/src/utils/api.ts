import axios from 'axios';

const API_URL = 'http://localhost:3002/api/auth';

export const register = async (username: string, email: string, password: string) => {
    return axios.post(`${API_URL}/register`, { username, email, password });
};

export const login = async (email: string, password: string) => {
    return axios.post(`${API_URL}/login`, { email, password });
};

export const logout = async () => {
    return axios.post(`${API_URL}/logout`, {  });
};