import axios from 'axios';

const API_URL = 'http://localhost:8081/api/expenses';

export const getExpenses = async (userId) => {
  // This sends: /api/expenses?userId=1
  const response = await axios.get(`${API_URL}/user/${userId}`);
  return response.data;
};

export const getExpenseById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createExpense = async (Data) => {
    try {
        // Note: Your controller expects a JSON @RequestBody
        const response = await axios.post(API_URL, Data);
        return response.data;
    } catch (error) {
        console.error("Full error object:", error.response); // Look at this in F12 console
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
    formData.append('userId', userId); // <--- ADD THIS

    const response = await axios.post(`${API_URL}/upload-receipt`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
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
  const response = await axios.get(`${API_URL}/search?q=${encodeURIComponent(searchTerm)}`);
  return response.data;
};

