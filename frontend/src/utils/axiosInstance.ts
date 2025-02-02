import axios from "axios";

const API_BASE_URL = "http://localhost:3002/api"; // Adjust to your API URL

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: false, // Ensures cookies are sent if needed
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`; // Add token to headers
    }
    return config;
});


// Add an interceptor to handle 401 errors globally
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            localStorage.clear() // Clear session storage
            window.location.href = "/login"; // Redirect to login
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
