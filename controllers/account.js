const { json } = require("express");
const Account = require("../models/account");



exports.dangnhap = async (req, res, next) => {
    // try {
    //     if (req.role === "admin") {
    //         console.log("Chao mung Admin");
    //     } else {
    //         console.log("Chao mung user");
    //     }
    // } catch (error) {

    // }
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
        return res.status(200).json({ product: xemCT });
    } catch (error) {

    }
};


exports.addAcc = async (req, res, next) => {
    try {
        if (req.method === "POST") {
            let { username, password, role } = req.body;


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
            let msg = 'Thêm thành công, id mới = ' + objAccount._id;
            console.log(msg);

            return res.redirect('/acc/danhsach');
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

        return res.redirect('/acc/danhsach');
    } catch (error) {

    }
};
exports.update = async (req, res, next) => {
    try {
        const findID = req.params.id;
        const { username, password } = req.body;
        const upDB = await Account.findByIdAndUpdate(findID,
            { username, password },
            { new: true, runValidators: true } // new: true để trả về đối tượng cập nhật, runValidators: true để chạy các validators
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }
        let msg = 'Thêm thành công, id mới = ' + findID;
        console.log(msg);
        return res.status(200).json({ message: 'Cập nhật thành công', product: upDB });

    } catch (error) {

    }
}