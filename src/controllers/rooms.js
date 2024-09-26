const { json } = require("express");
const Room = require("../models/rooms");



exports.listRoom = async (req, res, next) => {
    try {
        const rooms = await Room.find();
        return res.status(200).json(rooms);
    } catch (err) {
        return res.status(500).json({ message: 'Lỗi khi lấy danh sách sản phẩm' });
    }
}
exports.read = async (req, res, next) => {
    try {
        const findID = req.params.id;
        const readID = await Room.findOne({ _id: findID });
        if (!readID) {
            return res.json({ message: "Không tìm thấy phòng" });
        }
        return res.json({ message: "Tìm thấy phòng với ID:  " + findID, product: readID });
    } catch (error) {
        console.error('Log error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
exports.themRoom = async (req, res, next) => {
    try {
        // Kiểm tra xem req.user có tồn tại và có thuộc tính id không
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        if (req.method === "POST") {
            let { roomType, description, price, size } = req.body;

            if (!roomType) {
                let msg = "RoomType không được để trống!";
                console.log(msg);
                return res.status(400).send(msg);
            }
            if (!description) {
                let msg = "description không được để trống!";
                console.log(msg);
                return res.status(400).send(msg);
            }
            if (!price) {
                let msg = "price không được để trống!";
                console.log(msg);
                return res.status(400).send(msg);
            }
            if (!size) {
                let msg = "size không được để trống!";
                console.log(msg);
                return res.status(400).send(msg);
            }

            let objRooms = new Room({
                id_Landlord: req.user._id,
                roomType: roomType,
                description: description,
                price: price,
                size: size,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            });
            await objRooms.save();
            let msg = 'Thêm thành công phòng mới với id: ' + objRooms._id;
            return res.json(msg);
        }
    } catch (error) {
        console.error('Log error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.updateRoom = async (req, res, next) => {
    try {
        const idRoom = req.params.id;
        const { roomType, description, price, size } = req.body;
        if (!roomType) {
            let msg = "RoomType không được để trống!";
            console.log(msg);
            return res.status(400).send(msg);
        }
        if (!description) {
            let msg = "description không được để trống!";
            console.log(msg);
            return res.status(400).send(msg);
        }
        if (!price) {
            let msg = "price không được để trống!";
            console.log(msg);
            return res.status(400).send(msg);
        }
        if (!size) {
            let msg = "size không được để trống!";
            console.log(msg);
            return res.status(400).send(msg);
        }
        const upRoom = await Room.findByIdAndUpdate(
            idRoom,
            { roomType, description, price, size, updated_at: new Date().toISOString() },
            { new: true, runValidators: true }
        );
        if (!upRoom) {
            return res.status(404).json({ message: 'Không tìm thấy phòng' });
        }
        return res.status(200).json({ message: 'Cập nhật thành công', product: upRoom });
    } catch (error) {
        smg = "Lỗi: " + error.message;
        return res.status(500).json({ message: smg });
    }
}
exports.delete = async (req, res, next) => {
    try {
        const findID = req.params.id;
        const deleteID = await Room.findByIdAndDelete(findID);
        if (!deleteID) {
            return res.status(404).json({ message: " Không có đối tượng" });
        };

        let msg = 'Xóa phòng có ID: ' + findID;
        console.log(msg);
        return res.json(msg);
    } catch (error) {
        return json({ message: "Xoa that bai" })
    }
}