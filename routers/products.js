var express = require('express');
var router = express.Router();
var ctrl = require("../controllers/products");

router.get("/danhsach", ctrl.XemDanhSachSanPham);

router.post("/themdanhsach", ctrl.ThemSanPham);

router.delete("/:id", ctrl.xoa);

router.get("/:id", ctrl.xemchitiet);

router.put("/:id", ctrl.sua);



module.exports = router;