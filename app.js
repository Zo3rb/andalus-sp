require("dotenv").config({});
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./db-connection");
const { notFound, errorHandler } = require("./middleware/errorHandlers");

// Initializing The Application from Express.
const app = express();

// Connect The Database.
connectDB();

// Using Predefined Middleware.
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// Registering The Application Routers
app.use("/auth", require("./views/auth"));
app.use("/products", require("./views/products"));

// Registering The error Handlers Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is Up and Running on PORT: ${PORT}`));
