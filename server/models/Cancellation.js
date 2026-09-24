const mongoose = require("mongoose");

const cancellationSchema = new mongoose.Schema(
    {
        booking: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
            required: true,
            unique: true
        },

        reason: {
            type: String,
            required: true,
            trim: true
        },

        cancelledAt: {
            type: Date,
            default: Date.now
        },

        refundAmount: {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

const Cancellation = mongoose.model(
    "Cancellation",
    cancellationSchema
);

module.exports = Cancellation;