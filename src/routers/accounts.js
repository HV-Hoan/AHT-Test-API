var express = require('express');
var routerAccount = express.Router();
var ctrlAccounts = require("../controllers/account");

var verifyRole = require("../middlewares/checkRole");
var wrapError = require("../middlewares/wrapError");


//account   
// Route hiển thị form đăng nhập
routerAccount.get('/', wrapError(ctrlAccounts.ScreenLogin));
routerAccount.post('/', wrapError(ctrlAccounts.dangnhap));


routerAccount.get('/acc/list', verifyRole(['admin']), wrapError(ctrlAccounts.danhsachAcc));
routerAccount.get('/acc/read/:id', wrapError(ctrlAccounts.xemCT));
routerAccount.post('/acc/add', wrapError(ctrlAccounts.addAcc));
routerAccount.delete('/acc/delete/:id', verifyRole(['admin']), wrapError(ctrlAccounts.xoa));
routerAccount.put('/acc/update/:id', verifyRole(['admin']), wrapError(ctrlAccounts.update));

module.exports = routerAccount;