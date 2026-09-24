const express = require("express");
const validateRequiredFields = require("../middleware/validate");

const {
    createPassenger,
    getMyPassenger,
    updateMyPassenger,
    deleteMyPassenger
} = require("../controllers/passengerController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    validateRequiredFields(["name", "age", "gender", "phone"]),
    createPassenger
);

router.get(
    "/me",
    authMiddleware,
    getMyPassenger
);

router.put(
    "/me",
    authMiddleware,
    validateRequiredFields(["name", "age", "gender", "phone"]),
    updateMyPassenger
);

router.delete(
    "/me",
    authMiddleware,
    deleteMyPassenger
);

module.exports = router;