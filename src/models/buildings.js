const mongoose = require("mongoose");

const buildingChema = new mongoose.Schema({
    address: { type: String, require: true },
    description: { type: String, require: true },
    number_of_floors: { type: String, require: true },
    created_at: { type: String, require: false },
    updated_at: { type: String, require: false },
});



const buildings = mongoose.model('Buildings', buildingChema);
module.exports = buildings;