import axios from 'axios';

const AUTH_API_URL = 'https://expense-tracker-ocr-6.onrender.com/api/auth';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(
            `${AUTH_API_URL}/register`,
            userData
        );

        return response.data;
    } catch (error) {
        throw error.response?.data || "Server Error: Could not register";
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(
            `${AUTH_API_URL}/login`,
            credentials
        );

        return response.data;
    } catch (error) {
        throw error.response?.data || "Invalid Credentials";
    }
};