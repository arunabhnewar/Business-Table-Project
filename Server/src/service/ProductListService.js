// External Imports
const createError = require("http-errors");

// Internal Imports
const ProductsModel = require("../model/ProductsModel");

/**
 * Service function for fetching a paginated list of items with optional search criteria.
 *
 * @param {Object} req - The request object containing page number, items per page, and search keyword.
 * @param {Object} DataModel - The Mongoose model for the data collection.
 * @returns {Object} - The response containing the status and fetched data.
 * @throws {Object} - Throws a 500 Internal Server Error if an unexpected error occurs.
 */
const ProductListService = async (req) => {
  try {
    // Extract parameters from the request object
    const pageNo = Number(req.params.pageNo);
    const perPage = Number(req.params.perPage);
    const searchValue = req.params.searchKeyword;

    // Calculate the number of rows to skip based on pagination parameters
    let skipRow = (pageNo - 1) * perPage;

    let Rows;
    let Total;

    // Check if a search keyword is provided
    if (searchValue !== "0") {
      let SearchRgx = { $regex: searchValue, $options: "i" };
      let SearchQuery = { $or: [{ title: SearchRgx }] };

      Rows = await ProductsModel.aggregate([
        { $match: SearchQuery },
        { $skip: skipRow },
        { $limit: perPage },
      ]);

      Total = (
        await ProductsModel.aggregate([
          { $match: SearchQuery },
          { $count: "total" },
        ])
      )[0]["total"];
    } else {
      Rows = await ProductsModel.aggregate([
        { $skip: skipRow },
        { $limit: perPage },
      ]);

      Total = (await ProductsModel.aggregate([{ $count: "total" }]))[0][
        "total"
      ];
    }

    // Return the response object
    return { status: "success", total: Total, data: Rows };
  } catch (error) {
    console.log(error);
    // If an error occurs, throw an HTTP 500 error with the message "Something went wrong"
    throw createError(500, "Something went wrong");
  }
};

// Export the ListService function for use in other modules
module.exports = ProductListService;
