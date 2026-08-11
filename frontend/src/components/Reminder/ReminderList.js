import React from 'react';

const getIcon = (category) => {

    const icons = {
        Sowing: '🌱',
        Fertilizer: '🧪',
        Pesticide: '🐛',
        Irrigation: '💧',
        Harvest: '🌾',
        Machinery: '🚜',
        Loan: '💳',
        Insurance: '🛡️',
        Government: '📄',
        Livestock: '🐄',
        Other: '📌'
    };

    return icons[category] || '🔔';
};


const ReminderList = ({
    reminders,
    onComplete,
    onDelete
}) => {

    if (!reminders || reminders.length === 0) {

        return (
            <div className="empty-reminders">

                <div className="empty-icon">
                    🔔
                </div>

                <h2>No reminders yet</h2>

                <p>
                    Create a reminder for your next farming activity.
                </p>

            </div>
        );
    }

    return (
        <div className="reminder-list">

            <h2>📋 Your Reminders</h2>

            {reminders.map((reminder) => (

                <div
                    key={reminder.id}
                    className={`reminder-card ${
                        reminder.status === 'COMPLETED'
                            ? 'completed'
                            : ''
                    }`}
                >

                    <div className="reminder-icon">

                        {getIcon(reminder.category)}

                    </div>


                    <div className="reminder-content">

                        <div className="reminder-title-row">

                            <h3>
                                {reminder.title}
                            </h3>

                            <span
                                className={`priority ${reminder.priority?.toLowerCase()}`}
                            >
                                {reminder.priority}
                            </span>

                        </div>


                        <p className="reminder-meta">

                            {reminder.cropType &&
                                `🌱 ${reminder.cropType} • `}

                            📅 {reminder.reminderDate}

                            {reminder.reminderTime &&
                                ` • ⏰ ${reminder.reminderTime}`}

                        </p>


                        {reminder.description && (

                            <p className="reminder-description">
                                {reminder.description}
                            </p>

                        )}


                        <span className="reminder-category">
                            {reminder.category}
                        </span>

                    </div>


                    <div className="reminder-actions">

                        {reminder.status !== 'COMPLETED' && (

                            <button
                                className="complete-btn"
                                onClick={() =>
                                    onComplete(reminder.id)
                                }
                            >
                                ✓ Complete
                            </button>

                        )}

                        <button
                            className="delete-reminder-btn"
                            onClick={() =>
                                onDelete(reminder.id)
                            }
                        >
                            🗑️
                        </button>

                    </div>

                </div>

            ))}

        </div>
    );
};

export default ReminderList;