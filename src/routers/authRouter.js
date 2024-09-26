var express = require('express');
var router = express.Router();

var routerAccount = require("../routers/accounts");
var routerRoom = require("../routers/rooms");
var routerPost = require("../routers/posts");
var routerBuilding = require("../routers/buildings");

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