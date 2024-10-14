var express = require('express');
var routerAccount = express.Router();
var ctrlAccounts = require("../controllers/account");

var verifyRole = require("../middlewares/checkRole");
var wrapError = require("../utils/wrapError");


//account   
// Route hiển thị form đăng nhập

routerAccount.post('/verify', verifyRole(['landlord', 'admin']), (req, res) => {
    res.json({ success: true, message: "Xác minh thành công" });
});


routerAccount.get('/', wrapError(ctrlAccounts.ScreenLogin));
routerAccount.post('/', verifyRole(['admin']), wrapError(ctrlAccounts.dangnhap));


routerAccount.get('/list', verifyRole(['admin']), wrapError(ctrlAccounts.danhsachAcc));
routerAccount.get('/read/:id', wrapError(ctrlAccounts.xemCT));
routerAccount.post('/add', wrapError(ctrlAccounts.addAcc));
routerAccount.delete('/delete/:id', verifyRole(['admin']), wrapError(ctrlAccounts.xoa));
routerAccount.put('/update/:id', verifyRole(['admin']), wrapError(ctrlAccounts.update));

module.exports = routerAccount;