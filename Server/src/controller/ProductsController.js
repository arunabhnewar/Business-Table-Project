// Internal Imports
const ProductListService = require("../service/ProductListService");

const ProductList = async (req, res) => {
  try {
    const result = await ProductListService(req);

    // Return the result as a success response
    return res.status(200).json(result);
  } catch (error) {
    // If an error occurs, handle it and send an error response
    return res
      .status(500)
      .json({ status: "fail", message: "Something went wrong" });
  }
};

// Module Exports
module.exports = ProductList;
