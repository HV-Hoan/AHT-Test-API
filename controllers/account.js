const { json } = require("express");
const account = require("../models/account");



exports.dangnhap = async (req, res, next) => {
    try {

    } catch (error) {

    }
}
exports.danhsachAcc = async (req, res) => {
    try {
        const xemDSaccount = await account.find();
        return res.status(200).json(xemDSaccount);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
};


exports.addAcc = async (req, res, next) => {
    try {
        if (req.method === "POST") {
            const { username, password, role } = req.body;

            let objAccount = new account({
                username: username,
                password: password,
                role: role,
            });

            await objAccount.save();

            let msg = 'Thêm thành công, id mới = ' + objAccount._id;
            console.log(msg);

            return res.redirect('/account/danhsach');
        } else {
            return res.status(400).send('Invalid request method');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
};
