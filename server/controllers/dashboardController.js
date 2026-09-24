const User = require("../models/User");
const Train = require("../models/Train");
const Booking = require("../models/Booking");
const Cancellation = require("../models/Cancellation");

const getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTrains = await Train.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalCancellations = await Cancellation.countDocuments();
    const bookingStats = await Booking.aggregate([
      {
        $group: {
          _id: "$bookingStatus",
          count: {
            $sum: 1,
          },
        },
      },
    ]);
    const confirmedBookings = await Booking.aggregate([
      {
        $match: {
          bookingStatus: "confirmed",
        },
      },
    ]);
    const bookingWithPassengers = await Booking.aggregate([
        {
    $match: {
        bookingStatus: "confirmed"
    }
},
      {
        $lookup: {
          from: "passengers",
          localField: "passenger",
          foreignField: "_id",
          as: "passengerDetails",
        },
      },
      {
        $lookup: {
          from: "trains",
          localField: "train",
          foreignField: "_id",
          as: "trainDetails",
        },
      },
      {
        $unwind: "$trainDetails",
      },
      {
        $lookup: {
          from: "stations",
          localField: "trainDetails.source",
          foreignField: "_id",
          as: "sourceStation",
        },
      },
      {
        $lookup: {
          from: "stations",
          localField: "trainDetails.destination",
          foreignField: "_id",
          as: "destinationStation",
        },
      },
      {
    $sort: {
        journeyDate: -1
    }
}
    ]);
    res.status(200).json({
      totalUsers,
      totalTrains,
      totalBookings,
      totalCancellations,
      bookingStats,
      confirmedBookings,
      bookingWithPassengers,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
};
