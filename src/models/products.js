const mongoose = require("mongoose");

const productsCheme = new mongoose.Schema({
    name: { type: String, require: true },
    price: { type: String, require: true },

});

const products = mongoose.model('Products', productsCheme);
module.exports = products;