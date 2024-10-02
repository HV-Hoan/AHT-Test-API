var express = require('express');
var router = express.Router();

var routerAccount = require("./accounts");
var routerRoom = require("./rooms");
var routerPost = require("./posts");
var routerBuilding = require("./buildings");

// ///product
// router.get("/danhsach", wrapError(ctrlProducts.XemDanhSachSanPham));
// router.get("/:id", wrapError(ctrlProducts.xemchitiet));
// router.post("/login/themproduct", verifyRole(['admin']), wrapError(ctrlProducts.ThemSanPham));
// router.delete("/login/product/:id", verifyRole(['admin']), wrapError(ctrlProducts.xoa));
// router.put("/login/product/:id", verifyRole(['admin']), wrapError(ctrlProducts.sua));

// //Landlord
// router.get('/login/landlord/list', wrapError(ctrlLandlords.listLandlords));
// router.post('/login/landlord/add', verifyRole(['admin']), wrapError(ctrlLandlords.themLandlord));

router.use('/login', routerAccount, routerRoom, routerPost, routerBuilding);

module.exports = router;