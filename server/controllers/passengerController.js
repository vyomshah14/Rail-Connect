const Passenger = require("../models/Passenger");

const createPassenger = async (req, res, next) => {
    try {
        const { name, age, gender, phone } = req.body;

        const passenger = await Passenger.create({
            user: req.user.userId,
            name,
            age,
            gender,
            phone
        });

        res.status(201).json({
            message: "Passenger created successfully",
            passenger
        });
    } catch (error) {
        next(error);
    }
};
const getMyPassenger = async (req, res, next) => {
    try {
        const passenger = await Passenger.findOne({
            user: req.user.userId
        });

        if (!passenger) {
            return res.status(404).json({
                message: "Passenger profile not found"
            });
        }

        res.status(200).json(passenger);
    } catch (error) {
        next(error);
    }
};
const updateMyPassenger = async (req, res, next) => {
    try {
        const { name, age, gender, phone } = req.body;

        const passenger = await Passenger.findOneAndUpdate(
            {
                user: req.user.userId
            },
            {
                name,
                age,
                gender,
                phone
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!passenger) {
            return res.status(404).json({
                message: "Passenger profile not found"
            });
        }

        res.status(200).json({
            message: "Passenger updated successfully",
            passenger
        });
    } catch (error) {
        next(error);
    }
};
const deleteMyPassenger = async (req, res, next) => {
    try {
        const passenger = await Passenger.findOneAndDelete({
            user: req.user.userId
        });

        if (!passenger) {
            return res.status(404).json({
                message: "Passenger profile not found"
            });
        }

        res.status(200).json({
            message: "Passenger deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};
module.exports = {
    createPassenger,
    getMyPassenger,
    updateMyPassenger,
    deleteMyPassenger
};