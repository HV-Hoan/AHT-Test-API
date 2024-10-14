var express = require('express');
var router = express.Router();

var routerAccount = require("./accounts");
var routerRoom = require("./rooms");
var routerPost = require("./posts");
var routerBuilding = require("./buildings");





router.use('/acc', routerAccount);
router.use('/room', routerRoom);
router.use('/post', routerPost);
router.use('/building', routerBuilding);





module.exports = router;