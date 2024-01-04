// External imports
const mongoose = require("mongoose");

// Define the Products schema using Mongoose.
const ProductsSchema = new mongoose.Schema(
  {
    // id: { type: Number },
    title: { type: String },
    price: { type: String },
    special_price: { type: String },
    image: { type: String },
    category: { type: String },
    subcategory: { type: String },
    remark: { type: String },
    brand: { type: String },
    shop: { type: String },
    shop_name: { type: String },
    star: { type: String },
    product_code: { type: String },
    stock: { type: String },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    versionKey: false, // Disable versioning (__v field) for the documents
  }
);

// Create a Mongoose model using the ProductsSchema and name it "Products"
const ProductsModel = mongoose.model("Products", ProductsSchema);

// Export the ProductsModel for use in other modules.
module.exports = ProductsModel;
