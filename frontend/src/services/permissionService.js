import axios from 'axios';

const API_URL =
    process.env.REACT_APP_API_URL ||
    'https://expense-tracker-ocr-6.onrender.com';

export const getUserPermissions = async (userId) => {
    const response = await axios.get(
        `${API_URL}/api/admin/permissions/${userId}`
    );

    return response.data;
};