var express = require('express');
var routerRoom = express.Router();
var ctrlRooms = require("../controllers/rooms");

var verifyRole = require("../middlewares/checkRole");
var wrapError = require("../middlewares/wrapError");


//Room
routerRoom.get('/room/list', ctrlRooms.listRoom);
routerRoom.get('/room/read/:id', ctrlRooms.read);
routerRoom.post("/room/add", verifyRole(['landlord']), wrapError(ctrlRooms.themRoom));
routerRoom.put('/room/update/:id', verifyRole(['landlord']), wrapError(ctrlRooms.updateRoom));
routerRoom.delete('/room/delete/:id', verifyRole(['landlord']), wrapError(ctrlRooms.delete));

module.exports = routerRoom;