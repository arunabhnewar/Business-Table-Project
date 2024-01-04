// External imports
const dotenv = require("dotenv");
dotenv.config();

// Internal imports
const app = require("./app");

// create server and listen for incoming requests on the specified port
app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
