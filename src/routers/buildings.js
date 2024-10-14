var express = require('express');
var routerBuilding = express.Router();
var ctrlBuidlings = require("../controllers/buildings");

var verifyRole = require("../middlewares/checkRole");
var wrapError = require("../utils/wrapError");


//Building
routerBuilding.get('/list', verifyRole(['landlord']), wrapError(ctrlBuidlings.listBuilding));

routerBuilding.get('/add', verifyRole(['landlord']), wrapError(ctrlBuidlings.themBuilding));
routerBuilding.post('/add', verifyRole(['landlord']), wrapError(ctrlBuidlings.themBuilding));

routerBuilding.get('/update/:id', verifyRole(['landlord']), wrapError(ctrlBuidlings.updateBuilding));
routerBuilding.put('/update/:id', verifyRole(['landlord']), wrapError(ctrlBuidlings.updateBuilding));


module.exports = routerBuilding;