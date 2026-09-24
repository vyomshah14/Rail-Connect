const Booking = require("../models/Booking");
const Passenger = require("../models/Passenger");
const Train = require("../models/Train");
const Notification = require("../models/Notification");

const createBooking = async (req, res, next) => {
    try {
        const { trainId, journeyDate } = req.body;

        const passenger = await Passenger.findOne({
            user: req.user.userId
        });

        if (!passenger) {
            return res.status(404).json({
                message: "Passenger profile not found"
            });
        }

        const train = await Train.findById(trainId);

        if (!train) {
            return res.status(404).json({
                message: "Train not found"
            });
        }

        if (train.availableSeats <= 0) {
            return res.status(400).json({
                message: "No seats available"
            });
        }

        const pnr = `RC${Date.now()}`;

        const seatNumber = `S1-${train.totalSeats - train.availableSeats + 1}`;

        const booking = await Booking.create({
            passenger: passenger._id,
            train: train._id,
            pnr,
            seatNumber,
            journeyDate,
            bookingStatus: "confirmed"
        });

        train.availableSeats -= 1;

        await train.save();

        await Notification.create({
            user: req.user.userId,
            title: "Ticket Booking Confirmed",
            message: `Your booking for ${train.trainName} (#${train.trainNumber}) is confirmed. PNR: ${pnr}, Seat: ${seatNumber}.`,
            type: "booking"
        }).catch(() => {});

        res.status(201).json({
            message: "Booking created successfully",
            booking
        });
    } catch (error) {
    next(error);
}
};
const getMyBookings = async (req, res, next) => {
    try {
        const passenger = await Passenger.findOne({
            user: req.user.userId
        });

        if (!passenger) {
            return res.status(404).json({
                message: "Passenger profile not found"
            });
        }

        const bookings = await Booking.find({
            passenger: passenger._id
        }).populate({
            path: "train",
            populate: [
                {
                    path: "source"
                },
                {
                    path: "destination"
                }
            ]
        });

        res.status(200).json(bookings);
    } catch (error) {
        next(error);
    }
};
const getBookingByPNR = async (req, res, next) => {
    try {
        const { pnr } = req.params;

        const booking = await Booking.findOne({
            pnr
        }).populate({
            path: "train",
            populate: [
                {
                    path: "source"
                },
                {
                    path: "destination"
                }
            ]
        });

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        res.status(200).json(booking);
    } catch (error) {
        next(error);
    }
};
const getJourneyHistory = async (req, res, next) => {
    try {
        const passenger = await Passenger.findOne({
            user: req.user.userId
        });

        if (!passenger) {
            return res.status(404).json({
                message: "Passenger profile not found"
            });
        }

        const history = await Booking.find({
            passenger: passenger._id
        })
            .sort({ journeyDate: -1 })
            .populate({
                path: "train",
                populate: [
                    {
                        path: "source"
                    },
                    {
                        path: "destination"
                    }
                ]
            });

        res.status(200).json(history);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createBooking,
    getMyBookings,
    getBookingByPNR,
    getJourneyHistory
};