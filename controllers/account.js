const { json } = require("express");
const Account = require("../models/account");



exports.dangnhap = async (req, res, next) => {
    try {

    } catch (error) {

    }
}


// exports.danhsachAcc = async (req, res) => {
//     try {
//         const xemDSaccount = await Account.find();
//         return res.status(200).json(xemDSaccount);
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send('Loi server ');
//     }
// };

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
            return res.status(404).json({ message: " khong tim thay doi tuong " });
        }

        return res.status(200).json({ product: xemCT });
    } catch (error) {

    }
};


exports.addAcc = async (req, res, next) => {
    try {
        if (req.method === "POST") {
            let { username, password, role } = req.body;

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
            return res.status(400).send('Khong hop le');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Loi server roi');
    }
};
exports.xoa = async (req, res, next) => {
    try {
        const findID = req.params.id
        const xoaAcc = await Account.findByIdAndDelete(findID);

        if (!xoaAcc) {
            return res.status(404).json({ message: " khong co doi tuong" });
        };

        let msg = "xoa thanh cong";
        console.log(msg);
        return res.redirect('/acc/danhsach');
    } catch (error) {

    }
};