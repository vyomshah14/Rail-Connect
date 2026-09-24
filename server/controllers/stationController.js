const Station = require("../models/Station");

const getStations = async (req, res, next) => {
    try {
        const stations = await Station.find();

        res.status(200).json(stations);
    } catch (error) {
        next(error);
    }
};
const createStation = async (req, res, next) => {
    try {
        const { name, code, city, state } = req.body;

        const station = await Station.create({
            name,
            code,
            city,
            state
        });

        res.status(201).json(station);
    } catch (error) {
        next(error);
    }
};
const getStationById = async (req, res, next) => {
    try {
        const station = await Station.findById(req.params.id);

        if (!station) {
            return res.status(404).json({
                message: "Station not found"
            });
        }

        res.status(200).json(station);
    } catch (error) {
        next(error);
    }
};
const updateStation = async (req, res, next) => {
    try {
        const station = await Station.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!station) {
            return res.status(404).json({
                message: "Station not found"
            });
        }

        res.status(200).json(station);
    } catch (error) {
        next(error);
    }
};
const deleteStation = async (req, res, next) => {
    try {
        const station = await Station.findByIdAndDelete(req.params.id);

        if (!station) {
            return res.status(404).json({
                message: "Station not found"
            });
        }

        res.status(200).json({
            message: "Station deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getStations,
    createStation,
    getStationById,
    updateStation,
    deleteStation
};