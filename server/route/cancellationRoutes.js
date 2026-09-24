const express = require("express");
const validateRequiredFields = require("../middleware/validate");

const {
    cancelBooking
} = require("../controllers/cancellationController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    validateRequiredFields(["bookingId"]),
    cancelBooking
);

module.exports = router;