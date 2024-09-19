var express = require('express');
var router = express.Router();
var ctrlProducts = require("../controllers/products");
var ctrlAccounts = require("../controllers/account");
var ctrlRooms = require("../controllers/rooms");
var ctrlLandlords = require("../controllers/landlords");
var ctrlBuidlings = require("../controllers/buildings");

var verifyRole = require("../middlewares/checkRole");
var wrapError = require("../middlewares/wrapError");




// (['admin', 'user'])
//account   
router.post('/login', wrapError(ctrlAccounts.dangnhap));
router.get('/login/admin/acc/list', verifyRole(['admin']), wrapError(ctrlAccounts.danhsachAcc));
router.get('/login/acc/:id', wrapError(ctrlAccounts.xemCT));

router.post('/login/acc/add', wrapError(ctrlAccounts.addAcc));
router.delete('/login/admin/acc/:id', verifyRole(['admin']), wrapError(ctrlAccounts.xoa));
router.put('/login/admin/acc/:id', verifyRole(['admin']), wrapError(ctrlAccounts.update));


router.get("/danhsach", wrapError(ctrlProducts.XemDanhSachSanPham));
router.get("/:id", wrapError(ctrlProducts.xemchitiet));

router.post("/login/admin/themproduct", verifyRole(['admin']), wrapError(ctrlProducts.ThemSanPham));
router.delete("/login/admin/product/:id", verifyRole(['admin']), wrapError(ctrlProducts.xoa));
router.put("/login/admin/product/:id", verifyRole(['admin']), wrapError(ctrlProducts.sua));

//Room
router.get('/login/room/list', ctrlRooms.listRoom);
router.post("/login/room/add", verifyRole(['landlord']), ctrlRooms.themRoom);
router.put('/login/room/update/:id', verifyRole(['landlord']), ctrlRooms.updateRoom);

//Landlord
router.get('/login/landlord/list', ctrlLandlords.listLandlords);
router.post('/login/landlord/add', verifyRole(['admin']), ctrlLandlords.themLandlord);

//Building
router.post('/login/building/add', verifyRole(['admin', 'landlord']), ctrlBuidlings.themBuilding);
router.put('/login/building/update/:id', verifyRole(['admin', 'landlord']), ctrlBuidlings.updateBuilding);




module.exports = router;