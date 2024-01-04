// External imports
const express = require("express");

// Internal imports
const ProductList = require("../controller/ProductsController");

const router = express.Router();

router.get("/ProductList/:pageNo/:perPage/:searchKeyword", ProductList);

// module exports
module.exports = router;
