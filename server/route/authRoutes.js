const express = require("express");
const validateRequiredFields = require("../middleware/validate");
const {
    registerUser,
    loginUser   
} = require("../controllers/authController");

const router = express.Router();

router.post(
    "/register",
    validateRequiredFields(["name", "email", "password"]),
    registerUser
);
router.post(
    "/login",
    validateRequiredFields(["email", "password"]),
    loginUser
);

module.exports = router;