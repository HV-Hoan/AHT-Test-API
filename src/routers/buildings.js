var express = require('express');
var routerBuilding = express.Router();
var ctrlBuidlings = require("../controllers/buildings");

var verifyRole = require("../middlewares/checkRole");
var wrapError = require("../middlewares/wrapError");


//Building
routerBuilding.get('/building/list', verifyRole(['landlord']), wrapError(ctrlBuidlings.listBuilding));

routerBuilding.get('/building/add', verifyRole(['landlord']), wrapError(ctrlBuidlings.themBuilding));
routerBuilding.post('/building/add', verifyRole(['landlord']), wrapError(ctrlBuidlings.themBuilding));

routerBuilding.get('/building/update/:id', verifyRole(['landlord']), wrapError(ctrlBuidlings.updateBuilding));
routerBuilding.put('/building/update/:id', verifyRole(['landlord']), wrapError(ctrlBuidlings.updateBuilding));


module.exports = routerBuilding;