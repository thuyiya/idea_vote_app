import axios from 'axios';

const API_URL = 'http://localhost:3002/api/auth';

export const login = async (email: string, password: string) => {
    return axios.post(`${API_URL}/login`, { email, password });
};