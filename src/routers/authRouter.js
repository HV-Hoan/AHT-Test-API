var express = require('express');
var router = express.Router();
var ctrlProducts = require("../controllers/products");
var ctrlAccounts = require("../controllers/account");
var ctrlRooms = require("../controllers/rooms");
var ctrlLandlords = require("../controllers/landlords");
var ctrlBuidlings = require("../controllers/buildings");
var ctrlPost = require("../controllers/posts");

var verifyRole = require("../middlewares/checkRole");
var wrapError = require("../middlewares/wrapError");




// (['admin', 'user'])
//account   
router.post('/login', wrapError(ctrlAccounts.dangnhap));
router.get('/login/acc/list', verifyRole(['admin']), wrapError(ctrlAccounts.danhsachAcc));
router.get('/login/acc/read/:id', wrapError(ctrlAccounts.xemCT));
router.post('/login/acc/add', wrapError(ctrlAccounts.addAcc));
router.delete('/login/acc/delete/:id', verifyRole(['admin']), wrapError(ctrlAccounts.xoa));
router.put('/login/acc/update/:id', verifyRole(['admin']), wrapError(ctrlAccounts.update));

///product
router.get("/danhsach", wrapError(ctrlProducts.XemDanhSachSanPham));
router.get("/:id", wrapError(ctrlProducts.xemchitiet));
router.post("/login/themproduct", verifyRole(['admin']), wrapError(ctrlProducts.ThemSanPham));
router.delete("/login/product/:id", verifyRole(['admin']), wrapError(ctrlProducts.xoa));
router.put("/login/product/:id", verifyRole(['admin']), wrapError(ctrlProducts.sua));

//Room
router.get('/login/room/list', ctrlRooms.listRoom);
router.get('/login/room/read/:id', ctrlRooms.read);
router.post("/login/room/add", verifyRole(['landlord']), wrapError(ctrlRooms.themRoom));
router.put('/login/room/update/:id', verifyRole(['landlord']), wrapError(ctrlRooms.updateRoom));
router.delete('/login/room/delete/:id', verifyRole(['landlord']), wrapError(ctrlRooms.delete));

//Landlord
router.get('/login/landlord/list', wrapError(ctrlLandlords.listLandlords));
router.post('/login/landlord/add', verifyRole(['admin']), wrapError(ctrlLandlords.themLandlord));

//Building
router.get('/login/building/list', wrapError(ctrlBuidlings.listBuilding));
router.post('/login/building/add', verifyRole(['admin', 'landlord']), wrapError(ctrlBuidlings.themBuilding));
router.put('/login/building/update/:id', verifyRole(['admin', 'landlord']), wrapError(ctrlBuidlings.updateBuilding));

//Post
router.post('/login/post/add', verifyRole(['user', 'admin', 'landlord']), wrapError(ctrlPost.addPost));
router.put('/login/post/update/:id', wrapError(ctrlPost.update));

module.exports = router;