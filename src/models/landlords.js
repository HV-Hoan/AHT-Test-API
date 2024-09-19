const mongoose = require("mongoose");

const landlordChera = new mongoose.Schema({
    id_User: { type: mongoose.Schema.Types.ObjectId, ref: 'Accounts' },
    company_Name: { type: String, require: true },
    contact_Number: { type: String, require: true },
    email: { type: String, require: true },
    created_at: { type: String, require: false },
    updated_at: { type: String, require: false },
});



const landlords = mongoose.model('Landlords', landlordChera);
module.exports = landlords;