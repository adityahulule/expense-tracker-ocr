import axios from 'axios';

const API_URL =
    'https://expense-tracker-ocr-6.onrender.com/api/crops';


// =====================================================
// GET FARMER CROPS
// =====================================================

export const getCrops = async (userId) => {

    const response = await axios.get(
        `${API_URL}/user/${userId}`
    );

    return response.data;

};


// =====================================================
// GET CROP BY ID
// =====================================================

export const getCropById = async (id) => {

    const response = await axios.get(
        `${API_URL}/${id}`
    );

    return response.data;

};


// =====================================================
// CREATE CROP
// =====================================================

export const createCrop = async (crop) => {

    const response = await axios.post(
        API_URL,
        crop
    );

    return response.data;

};


// =====================================================
// UPDATE CROP
// =====================================================

export const updateCrop = async (
    id,
    crop
) => {

    const response = await axios.put(
        `${API_URL}/${id}`,
        crop
    );

    return response.data;

};


// =====================================================
// DELETE CROP
// =====================================================

export const deleteCrop = async (id) => {

    await axios.delete(
        `${API_URL}/${id}`
    );

};