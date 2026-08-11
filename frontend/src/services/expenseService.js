import axios from 'axios';

const API_URL = 'https://expense-tracker-ocr-6.onrender.com/api/expenses';

export const getExpenses = async (userId) => {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
};

export const getExpenseById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createExpense = async (data) => {
    try {
        const response = await axios.post(API_URL, data);
        return response.data;
    } catch (error) {
        console.error("Full error object:", error.response);
        throw error;
    }
};

export const updateExpense = async (id, expense) => {
    const response = await axios.put(`${API_URL}/${id}`, expense);
    return response.data;
};

export const deleteExpense = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};

export const uploadReceipt = async (file, userId) => {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('userId', userId);

    const response = await axios.post(
        `${API_URL}/upload-receipt`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    );

    return response.data;
};

export const getTotalExpenses = async () => {
    const response = await axios.get(`${API_URL}/total`);
    return response.data;
};

export const getExpensesByCategory = async (category) => {
    const response = await axios.get(`${API_URL}/category/${category}`);
    return response.data;
};

export const searchExpenses = async (searchTerm) => {
    const response = await axios.get(
        `${API_URL}/search?q=${encodeURIComponent(searchTerm)}`
    );

    return response.data;
};