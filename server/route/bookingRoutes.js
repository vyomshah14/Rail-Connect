const express = require("express");
const validateRequiredFields = require("../middleware/validate");
const {
    createBooking,
    getMyBookings,
    getBookingByPNR,
    getJourneyHistory
} = require("../controllers/bookingController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    validateRequiredFields(["trainId", "journeyDate"]),
    createBooking
);

router.get(
    "/my",
    authMiddleware,
    getMyBookings
);

router.get(
    "/pnr/:pnr",
    getBookingByPNR
);

router.get(
    "/history",
    authMiddleware,
    getJourneyHistory
);


module.exports = router;