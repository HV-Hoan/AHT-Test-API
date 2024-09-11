import mongoose from 'mongodb'

const userCheme = new mongoose.Schema({
    name: { type: String, require: true },
    password: { type: String, require: true },

});

const User = mongoose.model('User', userCheme);
module.exports = User;