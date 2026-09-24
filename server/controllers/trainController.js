const Train = require("../models/Train");

const getTrains = async (req, res, next) => {
  try {
    const {
      status,
      search,
      sort,
      order = "asc",
      page = 1,
      limit = 10,
    } = req.query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    let sortOption = {};

    const sortDirection = order === "desc" ? -1 : 1;

    if (sort === "name") {
      sortOption.trainName = sortDirection;
    }

    if (sort === "departure") {
      sortOption.departureTime = sortDirection;
    }
    const filter = {};
    if (search) {
      filter.$or = [
        {
          trainName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          trainNumber: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (status) {
      filter.status = status;
    }
    const trains = await Train.find(filter)
      .populate("source")
      .populate("destination")
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber);
    const totalTrains = await Train.countDocuments(filter);
    res.status(200).json({
      trains,
      pagination: {
        currentPage: pageNumber,
        limit: limitNumber,
        totalTrains,
        totalPages: Math.ceil(totalTrains / limitNumber),
      },
    });
  } catch (error) {
    next(error);
  }
};
const createTrain = async (req, res, next) => {
  try {
    const {
      trainNumber,
      trainName,
      source,
      destination,
      departureTime,
      arrivalTime,
      totalSeats,
      availableSeats,
      status,
    } = req.body;

    const train = await Train.create({
      trainNumber,
      trainName,
      source,
      destination,
      departureTime,
      arrivalTime,
      totalSeats,
      availableSeats,
      status,
    });

    res.status(201).json(train);
  } catch (error) {
    next(error);
  }
};
const getTrainById = async (req, res, next) => {
  try {
    const train = await Train.findById(req.params.id);

    if (!train) {
      return res.status(404).json({
        message: "Train not found",
      });
    }

    res.status(200).json(train);
  } catch (error) {
    next(error);
  }
};
const updateTrain = async (req, res, next) => {
  try {
    const train = await Train.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!train) {
      return res.status(404).json({
        message: "Train not found",
      });
    }

    res.status(200).json(train);
  } catch (error) {
    next(error);
  }
};
const deleteTrain = async (req, res, next) => {
  try {
    const train = await Train.findByIdAndDelete(req.params.id);

    if (!train) {
      return res.status(404).json({
        message: "Train not found",
      });
    }

    res.status(200).json({
      message: "Train deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getTrains,
  createTrain,
  getTrainById,
  updateTrain,
  deleteTrain,
};
