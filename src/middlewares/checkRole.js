const jwt = require('jsonwebtoken');
const Account = require("../models/account");


const verifyRole = allowedRoles => async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(400).json({
                message: "Bạn chưa đăng nhập"
            });
        }
        // Giải mã token
        const decoded = jwt.verify(token, 'hoan');
        req.user = decoded;  // Gán thông tin user vào request

        const user = await Account.findById(decoded._id);

        if (!user) {
            return res.status(403).json({
                message: "Người dùng không tồn tại"
            });
        }
        // Kiểm tra role của người dùng
        if (!allowedRoles.includes(user.role)) {
            return res.status(400).json({
                message: "Bạn không có quyền"
            });
        }

        next();
    } catch (error) {
        console.error("Lỗi:", error);
        return res.status(401).json({
            message: "Lỗi xác thực",
            error: error.message
        });
    }
};
module.exports = verifyRole;

