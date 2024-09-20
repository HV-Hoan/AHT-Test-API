const Landlord = require("../models/landlords");




exports.listLandlords = async (req, res, next) => {
    try {
        const landlords = await Landlord.find().populate({
            path: 'id_User',
            select: '_id'
        });
        return res.status(200).json(landlords);
    } catch (err) {
        return res.status(500).json({ message: 'Lỗi khi lấy danh sách Landlords' });
    }
};
exports.themLandlord = async (req, res, next) => {
    try {
        if (req.method === "POST") {
            let { id_User, company_Name, contact_Number, email } = req.body;

            let objLandlords = new Landlord({
                id_User,
                company_Name,
                contact_Number,
                email,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            });

            await objLandlords.save();

            let msg = 'Thêm thành công phòng mới với id: ' + objLandlords._id;
            return res.json(msg)
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
