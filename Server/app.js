// External Imports
const express = require("express");
const { readdirSync } = require("fs");
const path = require("path");

// Security-related middleware imports
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");

const connectDatabase = require("./src/db/database");
const router = require("./src/route/api");

// Create an instance of the Express application
const app = express();

// Establish a connection to the database
connectDatabase();

// Security Middleware Implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 300, // limit each IP to 300 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply rate limiting to the application
app.use(limiter);

// Load routes dynamically from the 'src/routes' directory
readdirSync("./src/route").map((r) =>
  app.use(`/api/v1`, require(`./src/route/${r}`))
);

// Export the Express application instance
module.exports = app;
