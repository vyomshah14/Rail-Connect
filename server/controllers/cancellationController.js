const Booking = require("../models/Booking");
const Passenger = require("../models/Passenger");
const Train = require("../models/Train");
const Cancellation = require("../models/Cancellation");
const Notification = require("../models/Notification");


const cancelBooking = async (req, res, next) => {
    try {
        const { bookingId, reason } = req.body;

        const passenger = await Passenger.findOne({
            user: req.user.userId
        });

        if (!passenger) {
            return res.status(404).json({
                message: "Passenger profile not found"
            });
        }

        const booking = await Booking.findOne({
            _id: bookingId,
            passenger: passenger._id
        });

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        if (booking.bookingStatus === "cancelled") {
            return res.status(400).json({
                message: "Booking is already cancelled"
            });
        }

        const train = await Train.findById(booking.train);

        if (!train) {
            return res.status(404).json({
                message: "Train not found"
            });
        }

        booking.bookingStatus = "cancelled";

        await booking.save();

        train.availableSeats += 1;

        await train.save();

        const cancellation = await Cancellation.create({
            booking: booking._id,
            reason,
            refundAmount: 0
        });

        
        await Notification.create({
            user: req.user.userId,
            title: "Ticket Booking Cancelled",
            message: `Your booking (PNR: ${booking.pnr}) for ${train.trainName} has been cancelled.`,
            type: "cancellation"
        }).catch(() => {});

        res.status(200).json({
            message: "Booking cancelled successfully",
            booking,
            cancellation
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    cancelBooking
};