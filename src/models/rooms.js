const mongoose = require("mongoose");

const roomChera = new mongoose.Schema({
    // id_Landlord: { type: String, require: false },
    id_Landlord: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Lưu id người tạo
    id_Building: { type: String, require: false },
    roomType: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: String, require: true },
    size: { type: String, require: true },
    availability_Status: { type: String, require: false },
    created_at: { type: String, require: false },
    updated_at: { type: String, require: false },

});



const rooms = mongoose.model('Rooms', roomChera);
module.exports = rooms;