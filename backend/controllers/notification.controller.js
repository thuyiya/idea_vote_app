const Notification = require('../models/notification');

// Get all notifications for a specific user
const getUserNotifications = async (req, res) => {
    try {
        const { userId } = req.params;

        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(400).json({ message: "Error fetching notifications" });
    }
};

// Update notification status to 'Read'
const updateNotificationStatus = async (req, res) => {
    try {
        const { notificationId } = req.params;

        const notification = await Notification.findByIdAndUpdate(
            notificationId,
            { status: 'Read' },
            { new: true }
        );

        if (!notification) {
            return res.status(400).json({ message: "Notification not found" });
        }

        res.status(200).json({ message: "Notification marked as read", notification });
    } catch (error) {
        res.status(400).json({ message: "Error updating notification" });
    }
};

const getAllNotification = async (req, res) => {
    try {
        const notifications = await Notification.find({});
        res.status(200).json(notifications);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error fetching notification" });
    }
};

module.exports = {
    getUserNotifications,
    updateNotificationStatus,
    getAllNotification
};
