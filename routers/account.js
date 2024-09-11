var express = require('express');
var router = express.Router();
var ctrl = require("../controllers/account");
var { checkAdmin } = require("../Middleware/checkRole");


router.get('/login', checkAdmin, ctrl.dangnhap);

router.get('/list', ctrl.danhsachAcc);

router.post('/add', ctrl.addAcc);

router.get('/:id', ctrl.xemCT);

router.delete('/:id', ctrl.xoa);

router.put('/:id', ctrl.update);


module.exports = router;