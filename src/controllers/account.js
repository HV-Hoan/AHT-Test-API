const { json } = require("express");
const jwt = require('jsonwebtoken');
const Account = require("../models/account");
const bcryptjs = require('bcryptjs');
const TOKEN_SEC_KEY = process.env.TOKEN_SEC_KEY;




exports.dangnhap = async (req, res, next) => {
    try {
        const { username, password, role } = req.body
        const user = await Account.findOne({ username })
        console.log(user);

        if (!user) {
            return res.status(400).json({
                message: "username hoac pass không đúng"
            })
        }

        const token = jwt.sign({ _id: user._id, role: user.role }, 'hoan', { expiresIn: '1h' });
        console.log("Token: " + token);


        //ẩn password
        user.password = undefined

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
            return res.status(404).json({ message: " Không tìm thấy đối tượng " });
        }


        let msg = 'Tìm thấy đối tượng ' + findID;
        console.log(msg);
        return res.status(200).json({ message: msg, product: xemCT });
    } catch (error) {
        smg = "Lỗi: " + error.message;
        return res.status(500).json({ message: smg });
    }
};


exports.addAcc = async (req, res, next) => {
    try {
        if (req.method === "POST") {
            let { username, password, role } = req.body;


            // Kiểm tra xem username đã tồn tại chưa
            const existingUser = await Account.findOne({ username });

            if (existingUser) {
                return res.status(400).json({ error: 'Username đã tồn tại. Vui lòng chọn username khác.' });
            }

            if (!username || !password) {
                let msg = "Username và password không được để trống!";
                console.log(msg);
                return res.status(400).send(msg);
            }

            let objAccount = new Account({
                username: username,
                password: password,
                role: role
            });

            await objAccount.save();
            let msg = 'Thêm thành công id mới = ' + objAccount._id;
            console.log(msg);

            //return res.redirect('/acc/danhsach');
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

        let msg = 'Xóa đối tượng có ID: ' + findID;
        console.log(msg);

        //return res.redirect('/acc/danhsach');
    } catch (error) {
        smg = "Lỗi: " + error.message;
        return res.status(500).json({ message: smg });
    }
};
exports.update = async (req, res, next) => {
    try {
        const findID = req.params.id;
        console.log('ID:', findID);

        const { username, password } = req.body;
        console.log('Username:', username, 'Password:', password);

        const upDB = await Account.findByIdAndUpdate(
            findID,
            { username, password },
            { new: true, runValidators: true } // new: true để trả về đối tượng cập nhật, runValidators: true để chạy các validators
        );
        console.log('ID:', findID);
        console.log('Dữ liệu cập nhật:', { username, password });
        console.log('Tài khoản cập nhật:', upDB);

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }
        let msg = 'Thêm thành công id mới = ' + findID;
        console.log(msg);
        return res.status(200).json({ message: 'Cập nhật thành công', product: upDB });

    } catch (error) {
        smg = "Lỗi: " + error.message;
        return res.status(500).json({ message: smg });
    }
}