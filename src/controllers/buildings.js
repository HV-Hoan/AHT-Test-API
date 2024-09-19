const Building = require("../models/buildings");

exports.themBuilding = async (req, res, next) => {
    try {
        if (req.method === 'POST') {
            let { address, description, number_of_floors } = req.body;
            let objBuldings = new Building({
                address,
                description,
                number_of_floors,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            });

            await objBuldings.save();

            let msg = 'Thêm thành công phòng mới với id: ' + objBuldings._id;
            return res.json(msg)
        }
    } catch (error) {
        console.error('Login error:', error);
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
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }

        return res.status(200).json({ message: 'Cập nhật thành công', product: upBuild });

    } catch (error) {
        smg = "Lỗi: " + error.message;
        return res.status(500).json({ message: smg });
    }
}