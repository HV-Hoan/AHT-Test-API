var express = require('express');
var account = express.Router();
const router = express.Router();
var ctrl = require("../controllers/account");
var { checkAdmin } = require("../Middleware/checkRole");
const { route } = require('./products');


router.get('/login', checkAdmin, ctrl.dangnhap);

router.get('/danhsach', ctrl.danhsachAcc);

router.post('/add', ctrl.addAcc);


module.exports = account;