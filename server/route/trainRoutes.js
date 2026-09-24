const express = require("express");
const validateRequiredFields = require("../middleware/validate");
const {
    getTrains,
    createTrain,
    getTrainById,
    updateTrain,
    deleteTrain
} = require("../controllers/trainController");

const router = express.Router();

router.get("/", getTrains);
router.get("/:id", getTrainById);
router.put(
    "/:id",
    validateRequiredFields([
        "trainNumber",
        "trainName",
        "source",
        "destination",
        "departureTime",
        "arrivalTime",
        "totalSeats",
        "availableSeats"
    ]),
    updateTrain
);
router.post(
    "/",
    validateRequiredFields([
        "trainNumber",
        "trainName",
        "source",
        "destination",
        "departureTime",
        "arrivalTime",
        "totalSeats",
        "availableSeats"
    ]),
    createTrain
);
router.delete("/:id", deleteTrain);

module.exports = router;