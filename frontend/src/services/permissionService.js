import axios from 'axios';

const API_URL =
    process.env.REACT_APP_API_URL ||
    'http://localhost:8081';

export const getUserPermissions = async (userId) => {
    const response = await axios.get(
        `${API_URL}/api/admin/permissions/${userId}`
    );

    return response.data;
};