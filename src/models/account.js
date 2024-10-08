const mongoose = require("mongoose");

const accountChema = new mongoose.Schema({
    fullname: { type: String, require: false },
    dob: { type: String, require: false },
    gender: { type: String, require: false },
    address: { type: Array, required: false },
    profile_picture_url: { type: String, require: false },
    username: { type: String, require: true },
    password: { type: String, require: true },
    email: { type: String, require: true },
    phoneNumber: { type: String, require: true },
    role: { type: String, enum: ['user', 'admin', 'landlord'], default: 'user' },
});

const account = mongoose.model('Accounts', accountChema);
module.exports = account;