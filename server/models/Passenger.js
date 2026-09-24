const mongoose = require("mongoose");

const passengerSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        age: {
            type: Number,
            required: true,
            min: 1
        },

        gender: {
            type: String,
            enum: ["male", "female", "other"],
            required: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const Passenger = mongoose.model("Passenger", passengerSchema);

module.exports = Passenger;