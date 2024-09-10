const mongoose = require("mongoose");



const accountChera = new mongoose.Schema({
    username: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

const account = mongoose.model('Accounts', accountChera);
module.exports = account;