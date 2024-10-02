const Building = require("../models/buildings");

exports.listBuilding = async (req, res, next) => {
    try {
        const listBuilding = await Building.find();
        return res.json({ message: "Tìm thấy danh sách building", products: listBuilding });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi khi lấy danh sách building' });
    }
}
exports.themBuilding = async (req, res, next) => {
    try {
        if (req.method === 'POST') {
            let { address, description, number_of_floors } = req.body;

            const userId = req.user._id; // log de xem id 

            let objBuldings = new Building({
                id_Landlord: req.user._id,
                address,
                description,
                number_of_floors,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            });

            await objBuldings.save();

            // Đếm tổng số tòa nhà mà user đã tạo
            const buildingCount = await Building.countDocuments({ id_Landlord: userId });

            res.json({ message: 'Sản phẩm đã được tạo thành công', totalBuildings: buildingCount });
        }
    } catch (error) {
        console.error('Log error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
exports.updateBuilding = async (req, res, next) => {
    try {
        const idBuilding = req.params.id;
        const { address, description, number_of_floors } = req.body;
        const upBuild = await Building.findByIdAndUpdate(
            idBuilding,
            { address, description, number_of_floors, updated_at: new Date().toISOString() },
            { new: true, runValidators: true }
        );
        if (!upBuild) {
            return res.status(404).json({ message: 'Không tồn tại' });
        }
        return res.status(200).json({ message: 'Cập nhật thành công', product: upBuild });
    } catch (error) {
        smg = "Lỗi: " + error.message;
        return res.status(500).json({ message: smg });
    }
}