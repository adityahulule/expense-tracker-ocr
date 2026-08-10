import axios from 'axios';

// Note the port 8081 and the /api/auth path
const AUTH_API_URL = 'http://localhost:8081/api/auth';

export const registerUser = async (userData) => {
    try {
        // Corrected variable name to AUTH_API_URL
        const response = await axios.post(`${AUTH_API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        // If backend sends a specific message, show it, otherwise generic error
        throw error.response?.data || "Server Error: Could not register";
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${AUTH_API_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        throw error.response?.data || "Invalid Credentials";
    }
};