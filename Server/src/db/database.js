// External imports
const mongoose = require("mongoose");

/**
 * @function connectDatabase
 * @description Connects to the MongoDB database using Mongoose.
 */
const connectDatabase = () => {
  // Use Mongoose to connect to the MongoDB database specified in the DB_URI environment variable
  mongoose
    .connect(process.env.DB_URI, {})
    .then(() => {
      // If the connection is successful, log a success message
      console.log("Database connected successfully!!");
    })
    .catch((err) => {
      // If there is an error during the connection, log an error message
      console.log("Database connection error:", err);
    });
};

// Export the connectDatabase function to be used in other parts of the application
module.exports = connectDatabase;
