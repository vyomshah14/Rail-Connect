const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema(
    {
        trainNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        trainName: {
            type: String,
            required: true,
            trim: true
        },

        source: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Station",
            required: true
        },

        destination: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Station",
            required: true
        },

        departureTime: {
            type: String,
            required: true
        },

        arrivalTime: {
            type: String,
            required: true
        },

        totalSeats: {
            type: Number,
            required: true,
            min: 1
        },

        availableSeats: {
            type: Number,
            required: true,
            min: 0
        },

        status: {
            type: String,
            enum: [
                "scheduled",
                "boarding",
                "departed",
                "in_transit",
                "arriving",
                "arrived",
                "delayed",
                "cancelled"
            ],
            default: "scheduled"
        }
    },
    {
        timestamps: true
    }
);

const Train = mongoose.model("Train", trainSchema);

module.exports = Train;