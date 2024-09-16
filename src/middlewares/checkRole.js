const jwt = require('jsonwebtoken');
const Account = require("../models/account");
const TOKEN_SEC_KEY = process.env.TOKEN_SEC_KEY;


const verifyRole = async (req, res, next) => {
    try {
        console.log("Chạy qua đây 1: Bắt đầu kiểm tra token");

        const token = req.headers.authorization?.split(' ')[1]
        console.log("Token: " + token);
        if (!token) {
            return res.status(400).json({
                message: "Bạn chưa đăng nhập"
            });
        }

        console.log("Chạy qua đây 2: Token hợp lệ, kiểm tra xác thực");


        // Giải mã token
        const decoded = jwt.verify(token, 'hoan');
        console.log("Decoded Token:", decoded);

        // Tìm người dùng từ cơ sở dữ liệu
        const user = await Account.findById(decoded._id);
        console.log(decoded._id);

        console.log("Người dùng:", user);

        if (!user) {
            return res.status(403).json({
                message: "Người dùng không tồn tại"
            });
        }

        console.log("Chạy qua đây 3: Người dùng tồn tại, kiểm tra quyền");

        if (user.role !== "admin") {
            return res.status(400).json({
                message: "Bạn không có quyền"
            });
        }

        console.log("Chạy qua đây 4: Người dùng có quyền, tiếp tục");
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

