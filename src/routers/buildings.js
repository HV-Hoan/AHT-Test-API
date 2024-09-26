var express = require('express');
var routerBuilding = express.Router();
var ctrlBuidlings = require("../controllers/buildings");

var verifyRole = require("../middlewares/checkRole");
var wrapError = require("../middlewares/wrapError");


//Building
routerBuilding.get('/building/list', verifyRole(['admin']), wrapError(ctrlBuidlings.listBuilding));
routerBuilding.post('/building/add', verifyRole(['admin', 'landlord']), wrapError(ctrlBuidlings.themBuilding));
routerBuilding.put('/building/update/:id', verifyRole(['admin', 'landlord']), wrapError(ctrlBuidlings.updateBuilding));


module.exports = routerBuilding;