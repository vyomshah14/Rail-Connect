const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const trainRoutes = require("./route/trainRoutes");
const stationRoutes = require("./route/stationRoutes");
const authRoutes = require("./route/authRoutes");
const dashboardRoutes = require("./route/dashboardRoutes");
const passengerRoutes = require("./route/passengerRoutes");
const bookingRoutes = require("./route/bookingRoutes");
const cancellationRoutes = require("./route/cancellationRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
const notificationRoutes = require("./route/notificationRoutes");
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/trains", trainRoutes);
app.use("/api/stations", stationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/passengers", passengerRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/cancellations", cancellationRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
    res.send("RailConnect API is running");
});

const PORT = 5000;

app.use(errorMiddleware);


app.listen(PORT, "0.0.0.0", () => {
    console.log(`RailConnect server running on port ${PORT}`);
});