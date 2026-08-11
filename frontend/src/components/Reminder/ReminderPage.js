import React, { useEffect, useState } from 'react';
import './Reminder.css';

import ReminderForm from './ReminderForm';
import ReminderList from './ReminderList';

import {
    getReminders,
    createReminder,
    completeReminder,
    deleteReminder
} from '../../services/reminderService';

const ReminderPage = () => {

    const [reminders, setReminders] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const userData = localStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : null;

    const loadReminders = async () => {
        if (!user?.id) return;

        try {
            const data = await getReminders(user.id);
            setReminders(data || []);
        } catch (error) {
            console.error('Error loading reminders:', error);
        }
    };

    useEffect(() => {
        loadReminders();
    }, []);

    const handleCreateReminder = async (reminderData) => {

        try {

            await createReminder({
                ...reminderData,
                userId: user.id
            });

            setShowForm(false);
            loadReminders();

        } catch (error) {
            console.error('Error creating reminder:', error);
            alert('Failed to create reminder');
        }
    };

    const handleComplete = async (id) => {

        try {

            await completeReminder(id);
            loadReminders();

        } catch (error) {
            console.error('Error completing reminder:', error);
        }
    };

    const handleDelete = async (id) => {

        if (!window.confirm('Delete this reminder?')) {
            return;
        }

        try {

            await deleteReminder(id);
            loadReminders();

        } catch (error) {
            console.error('Error deleting reminder:', error);
        }
    };

    const pendingReminders =
        reminders.filter(r => r.status !== 'COMPLETED');

    const completedReminders =
        reminders.filter(r => r.status === 'COMPLETED');

    return (
        <div className="reminder-page">

            <div className="reminder-header">

                <div>
                    <h1>🔔 My Reminders</h1>
                    <p>
                        Never miss an important farming activity.
                    </p>
                </div>

                <button
                    className="add-reminder-btn"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? '✕ Close' : '+ Add Reminder'}
                </button>

            </div>

            {showForm && (
                <ReminderForm
                    onSubmit={handleCreateReminder}
                    onCancel={() => setShowForm(false)}
                />
            )}

            <div className="reminder-stats">

                <div className="reminder-stat-card">
                    <span>📋</span>
                    <div>
                        <strong>{pendingReminders.length}</strong>
                        <small>Pending</small>
                    </div>
                </div>

                <div className="reminder-stat-card">
                    <span>✅</span>
                    <div>
                        <strong>{completedReminders.length}</strong>
                        <small>Completed</small>
                    </div>
                </div>

            </div>

            <ReminderList
                reminders={reminders}
                onComplete={handleComplete}
                onDelete={handleDelete}
            />

        </div>
    );
};

export default ReminderPage;