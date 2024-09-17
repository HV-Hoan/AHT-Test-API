var express = require('express');
var router = express.Router();
var ctrlProducts = require("../controllers/products");
var ctrlAccounts = require("../controllers/account");
var verifyRole = require("../middlewares/checkRole");
var wrapError = require("../middlewares/wrapError");




// (['admin', 'user'])

router.post('/login', wrapError(ctrlAccounts.dangnhap));
router.get('/login/admin/acc/list', verifyRole, wrapError(ctrlAccounts.danhsachAcc));
router.get('/login/acc/:id', wrapError(ctrlAccounts.xemCT));

router.post('/login/acc/add', wrapError(ctrlAccounts.addAcc));
router.delete('/login/admin/acc/:id', verifyRole, wrapError(ctrlAccounts.xoa));
router.put('/login/admin/acc/:id', verifyRole, wrapError(ctrlAccounts.update));


router.get("/danhsach", wrapError(ctrlProducts.XemDanhSachSanPham));
router.get("/:id", wrapError(ctrlProducts.xemchitiet));

router.post("/login/admin/themproduct", verifyRole, wrapError(ctrlProducts.ThemSanPham));
router.delete("/login/admin/product/:id", verifyRole, wrapError(ctrlProducts.xoa));
router.put("/login/admin/product/:id", verifyRole, wrapError(ctrlProducts.sua));





module.exports = router;