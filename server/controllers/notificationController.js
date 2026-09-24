const Notification = require("../models/Notification");

const createNotification = async (req, res, next) => {
    try {
        const {
            user,
            title,
            message,
            type
        } = req.body;

        const notification = await Notification.create({
            user,
            title,
            message,
            type
        });

        res.status(201).json({
            message: "Notification created successfully",
            notification
        });
    } catch (error) {
        next(error);
    }
};

const getMyNotifications = async (req, res, next) => {
    try {
        const filter = req.user.role === "admin" ? {} : { user: req.user.userId };

        const notifications = await Notification.find(filter).sort({ createdAt: -1 });

        res.status(200).json(notifications);
    } catch (error) {
        next(error);
    }
};

const markNotificationAsRead = async (req, res, next) => {
    try {
        // Find notification by ID and mark as read
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            {
                isRead: true
            },
            {
                new: true
            }
        );

        if (!notification) {
            return res.status(404).json({
                message: "Notification not found"
            });
        }

        res.status(200).json({
            message: "Notification marked as read",
            notification
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createNotification,
    getMyNotifications,
    markNotificationAsRead
};