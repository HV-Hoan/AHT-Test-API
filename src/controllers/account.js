const jwt = require('jsonwebtoken');
const Account = require("../models/account");
const TOKEN = process.env.TOKEN;



exports.ScreenLogin = (req, res) => {
    res.render('Login/login');
}

exports.dangnhap = async (req, res, next) => {
    try {
        const { username, password, role } = req.body
        const user = await Account.findOne({ username, password })
        if (!user) {
            return res.status(400).json({
                message: "Username hoặc Password không đúng"
            })
        }
        const token = jwt.sign({ _id: user._id, role: user.role }, 'hoan', { expiresIn: '1h' });
        //const token = jwt.sign({ _id: user._id, role: user.role }, TOKEN, { expiresIn: '1h' });
        // console.log("Token: " + token);
        //ẩn password 
        // user.password = undefined
        if (!user) {
            return res.status(400).json({
                message: "Đăng nhập không thành công"
            })
        }
        return res.status(200).json({
            message: "Đăng nhập thành công",
            datas: { ...user.toObject(), accessToken: token }
        })
    } catch (error) {
        console.error(error, " Password: " + req.body.password);
        return res.status(400).send({ error: 'Lỗi trong quá trình đăng nhập', details: error.message });
    }
}
exports.danhsachAcc = async (req, res, next) => {
    try {
        const account = await Account.find();
        return res.status(200).json(account);
    } catch (err) {
        return res.status(500).json({ message: 'Lỗi khi lấy danh sách account' });
    }
};
exports.xemCT = async (req, res, next) => {
    try {
        const findID = req.params.id;
        const xemCT = await Account.findOne({ _id: findID });
        if (!xemCT) {
            return res.json({ message: " Không tìm thấy đối tượng " });
        }
        let msg = 'Tìm thấy đối tượng ' + findID;
        console.log(msg);
        return res.status(200).json({ message: msg, product: xemCT });
    } catch (error) {
        smg = "Lỗi: " + error.message;
        return res.status(500).json({ message: smg });
    }
};

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
const validatePhoneNumber = (phoneNumber) => {
    return /^\d{10,15}$/.test(phoneNumber);
};

exports.addAcc = async (req, res, next) => {
    try {
        if (req.method === "POST") {
            let { username, password, email, phoneNumber, role } = req.body;
            const existingUser = await Account.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ error: 'Username đã tồn tại. Vui lòng chọn username khác.' });
            }
            if (!username || !password) {
                let msg = "Username, password không được để trống!";
                console.log(msg);
                return res.status(400).send(msg);
            }
            if (!validateEmail(email)) {
                let msg = "Email không đúng định dạng!";
                console.log(msg);
                return res.status(400).send(msg);
            }
            if (!validatePhoneNumber(phoneNumber)) {
                let msg = "Số điện thoại không đúng định dạng!";
                console.log(msg);
                return res.status(400).send(msg);
            }

            let objAccount = new Account({
                username: username,
                password: password,
                email: email,
                phoneNumber: phoneNumber,
                role: role
            });
            await objAccount.save();
            let msg = 'Thêm thành công id mới = ' + objAccount._id;
            console.log(msg);
            return res.json(msg);
        } else {
            return res.status(400).send('Không hợp lệ');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Lỗi server rồi');
    }
};
exports.xoa = async (req, res, next) => {
    try {
        const findID = req.params.id;
        const xoaAcc = await Account.findByIdAndDelete(findID);
        if (!xoaAcc) {
            return res.status(404).json({ message: " Không có đối tượng" });
        };

        let msg = 'Xóa tài khoản có ID: ' + findID;
        console.log(msg);

    } catch (error) {
        smg = "Lỗi: " + error.message;
        return res.status(500).json({ message: smg });
    }
};
exports.update = async (req, res, next) => {
    try {
        const findID = req.params.id;
        const { username, password, email, phoneNumber } = req.body;

        if (!validateEmail(email)) {
            let msg = "Email không đúng định dạng!";
            console.log(msg);
            return res.status(400).send(msg);
        }
        if (!validatePhoneNumber(phoneNumber)) {
            let msg = "Số điện thoại không đúng định dạng!";
            console.log(msg);
            return res.status(400).send(msg);
        }

        const upDB = await Account.findByIdAndUpdate(
            findID,
            { username, password, email, phoneNumber },
            { new: true, runValidators: true } // new: true để trả về đối tượng cập nhật, runValidators: true để chạy các validators
        );

        if (!upDB) {
            return res.status(404).json({ message: 'Không tìm thấy tàn khoản' });
        }

        let msg = 'Sửa thành công id: ' + findID;
        console.log(msg);
        return res.status(200).json({ message: 'Cập nhật thành công', product: upDB });

    } catch (error) {
        smg = "Lỗi: " + error.message;
        return res.status(500).json({ message: smg });
    }
}