var express = require('express');
var account = express.Router();
var ctrl = require("../controllers/account");
var { checkUser } = require("../Middleware/checkRole");

router.get('/login', checkUser, ctrl.dangnhap);







module.exports = account;