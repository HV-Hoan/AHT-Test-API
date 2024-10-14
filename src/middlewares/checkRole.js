const jwt = require('jsonwebtoken');
const Account = require("../models/account");

const verifyRole = (allowedRoles) => async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        console.log("Headers:", req.headers);  // Xem toàn bộ header
        console.log("Token Extracted:", token);  // Kiểm tra token

        if (!token) {
            return res.status(401).json({ message: "Bạn chưa đăng nhập" });
        }

        const decoded = jwt.verify(token, 'hoan');
        //req.user = decoded;  // Gán thông tin user vào request

        const user = await Account.findById(decoded._id);
        if (!user) {
            return res.status(403).json({ message: "Người dùng không tồn tại" });
        }

        if (!allowedRoles.includes(user.role)) {
            return res.status(400).json({ message: "Bạn không có quyền" });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: "Lỗi xác thực", error: error.message });
    }
};

module.exports = verifyRole;
