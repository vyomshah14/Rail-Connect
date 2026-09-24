const express = require("express");

const {
    createNotification,
    getMyNotifications,
    markNotificationAsRead
} = require("../controllers/notificationController");

const authMiddleware = require("../middleware/authMiddleware");
const validateRequiredFields = require("../middleware/validate");

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    validateRequiredFields([
        "user",
        "title",
        "message",
        "type"
    ]),
    createNotification
);

router.get(
    "/my",
    authMiddleware,
    getMyNotifications
);

router.patch(
    "/:id/read",
    authMiddleware,
    markNotificationAsRead
);

router.put(
    "/:id/read",
    authMiddleware,
    markNotificationAsRead
);

router.patch(
    "/:id",
    authMiddleware,
    markNotificationAsRead
);

router.put(
    "/:id",
    authMiddleware,
    markNotificationAsRead
);

module.exports = router;