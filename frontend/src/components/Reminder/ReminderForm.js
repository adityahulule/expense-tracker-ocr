import React, { useState } from 'react';

const ReminderForm = ({ onSubmit, onCancel }) => {

    const [formData, setFormData] = useState({
        title: '',
        category: 'Fertilizer',
        cropType: '',
        reminderDate: '',
        reminderTime: '',
        description: '',
        priority: 'MEDIUM'
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!formData.title.trim()) {
            alert('Please enter reminder title');
            return;
        }

        if (!formData.reminderDate) {
            alert('Please select reminder date');
            return;
        }

        onSubmit(formData);
    };

    return (
        <div className="reminder-form-card">

            <h2>➕ Create New Reminder</h2>

            <form onSubmit={handleSubmit}>

                <div className="reminder-form-grid">

                    <div className="form-group">
                        <label>Reminder Title *</label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. Apply fertilizer"
                            required
                        />
                    </div>


                    <div className="form-group">
                        <label>Category</label>

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="Sowing">🌱 Sowing</option>
                            <option value="Fertilizer">🧪 Fertilizer</option>
                            <option value="Pesticide">🐛 Pesticide</option>
                            <option value="Irrigation">💧 Irrigation</option>
                            <option value="Harvest">🌾 Harvest</option>
                            <option value="Machinery">🚜 Machinery</option>
                            <option value="Loan">💳 Loan Payment</option>
                            <option value="Insurance">🛡️ Insurance</option>
                            <option value="Government">📄 Government Scheme</option>
                            <option value="Livestock">🐄 Livestock</option>
                            <option value="Other">📌 Other</option>
                        </select>
                    </div>


                    <div className="form-group">
                        <label>Crop</label>

                        <input
                            type="text"
                            name="cropType"
                            value={formData.cropType}
                            onChange={handleChange}
                            placeholder="e.g. Soybean"
                        />
                    </div>


                    <div className="form-group">
                        <label>Date *</label>

                        <input
                            type="date"
                            name="reminderDate"
                            value={formData.reminderDate}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="form-group">
                        <label>Time</label>

                        <input
                            type="time"
                            name="reminderTime"
                            value={formData.reminderTime}
                            onChange={handleChange}
                        />
                    </div>


                    <div className="form-group">
                        <label>Priority</label>

                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                        >
                            <option value="LOW">🟢 Low</option>
                            <option value="MEDIUM">🟡 Medium</option>
                            <option value="HIGH">🔴 High</option>
                        </select>
                    </div>

                </div>


                <div className="form-group">
                    <label>Description</label>

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Add details about this reminder..."
                        rows="3"
                    />

                </div>


                <div className="reminder-form-actions">

                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="save-reminder-btn"
                    >
                        🔔 Save Reminder
                    </button>

                </div>

            </form>

        </div>
    );
};

export default ReminderForm;