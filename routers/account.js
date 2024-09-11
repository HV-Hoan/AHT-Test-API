var express = require('express');
var router = express.Router();
var ctrl = require("../controllers/account");
var { checkAdmin } = require("../Middleware/checkRole");


router.get('/login', checkAdmin, ctrl.dangnhap);

router.get('/danhsach', ctrl.danhsachAcc);

router.post('/add', ctrl.addAcc);

router.get('/:id', ctrl.xemCT);

router.delete('/:id', ctrl.xoa);


module.exports = router;