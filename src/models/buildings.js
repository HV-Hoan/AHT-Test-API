const mongoose = require('mongoose');

const buildingSchema = new mongoose.Schema({
    id_Landlord: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    number_of_floors: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const buildings = mongoose.model('Buildings', buildingSchema);
module.exports = buildings;
