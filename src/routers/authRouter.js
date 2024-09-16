var express = require('express');
var router = express.Router();
var ctrlProducts = require("../controllers/products");
var ctrlAccounts = require("../controllers/account");
var verifyRole = require("../middlewares/checkRole");


//router.get('/login', checkAdmin, checkUser, ctrlAccounts.dangnhap);
router.post('/login', ctrlAccounts.dangnhap);
router.get('/login/admin/acc/list', verifyRole, ctrlAccounts.danhsachAcc);
router.get('/login/acc/:id', ctrlAccounts.xemCT);

router.post('/login/acc/add', ctrlAccounts.addAcc);
router.delete('/login/admin/acc/:id', verifyRole, ctrlAccounts.xoa);
router.put('/login/admin/acc/:id', verifyRole, ctrlAccounts.update);


router.get("/danhsach", ctrlProducts.XemDanhSachSanPham);
router.get("/:id", ctrlProducts.xemchitiet);

router.post("/login/admin/themproduct", verifyRole, ctrlProducts.ThemSanPham);
router.delete("/login/admin/product/:id", verifyRole, ctrlProducts.xoa);
router.put("/login/admin/product/:id", verifyRole, ctrlProducts.sua);





module.exports = router;