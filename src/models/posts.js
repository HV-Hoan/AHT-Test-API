const mongoose = require("mongoose");

const postChema = new mongoose.Schema({
    // id_Landlord: { type: String, require: false },
    id_User: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Lưu id người tạo
    title: { type: String, require: true },
    content: { type: String, require: true },
    status: { type: String, require: true },
    created_at: { type: String, require: false },
    updated_at: { type: String, require: false },
});



const rooms = mongoose.model('Posts', postChema);
module.exports = rooms;