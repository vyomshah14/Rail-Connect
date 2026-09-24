const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const validateRequiredFields = require("../middleware/validate");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
    getStations,
    createStation,
    getStationById,
    updateStation,
    deleteStation
} = require("../controllers/stationController");

const router = express.Router();

router.get("/", authMiddleware, getStations);
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    deleteStation
);
router.post(
    "/",
    validateRequiredFields(["name", "code", "city", "state"]),
    createStation
);
router.get("/:id", getStationById);
router.put(
    "/:id",
    validateRequiredFields(["name", "code", "city", "state"]),
    updateStation
);
module.exports = router;