const express = require('express');
const cookieParser = require("cookie-parser");
const app = express();

const errorMiddleware = require("./Middleware/error");

// Middleware
app.use(express.json());
app.use(cookieParser());

// Route Imports
const lawyerRoute = require("./routes/LawyerRoute");
const userRoute = require("./routes/UserRoute");

app.use("/api/v1", lawyerRoute);
app.use("/api/v1", userRoute);

// Error Middleware
app.use(errorMiddleware);

module.exports = app;