import axios from 'axios';

const API_URL =
    process.env.REACT_APP_API_URL ||
    'http://localhost:8081';


// ==========================================
// GET ALL FARMERS
// ==========================================

export const getAllFarmers = async () => {

    const response = await axios.get(
        `${API_URL}/api/admin/farmers`
    );

    return response.data;
};


// ==========================================
// GET FARMER BY ID
// ==========================================

export const getFarmerById = async (id) => {

    const response = await axios.get(
        `${API_URL}/api/admin/farmers/${id}`
    );

    return response.data;
};