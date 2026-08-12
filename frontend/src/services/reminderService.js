import axios from 'axios';

const API_URL =
    'https://expense-tracker-ocr-6.onrender.com/api/reminders';

export const createReminder = async (reminder) => {
    const response = await axios.post(API_URL, reminder);
    return response.data;
};

export const getReminders = async (userId) => {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
};

export const updateReminder = async (id, reminder) => {
    const response = await axios.put(
        `${API_URL}/${id}`,
        reminder
    );

    return response.data;
};

export const completeReminder = async (id) => {
    const response = await axios.put(
        `${API_URL}/${id}/complete`
    );

    return response.data;
};

export const deleteReminder = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};