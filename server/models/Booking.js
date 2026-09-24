const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        passenger: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Passenger",
            required: true
        },

        train: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Train",
            required: true
        },

        pnr: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        seatNumber: {
            type: String,
            required: true,
            trim: true
        },

        journeyDate: {
            type: Date,
            required: true
        },

        bookingStatus: {
            type: String,
            enum: ["confirmed", "cancelled"],
            default: "confirmed"
        },

        bookingDate: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;