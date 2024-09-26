var express = require('express');
var routerPost = express.Router();
var ctrlPost = require("../controllers/posts");

var verifyRole = require("../middlewares/checkRole");
var wrapError = require("../middlewares/wrapError");


//Post
routerPost.get('/post/list', wrapError(ctrlPost.list))
routerPost.post('/post/add', verifyRole(['user', 'admin', 'landlord']), wrapError(ctrlPost.addPost));
routerPost.put('/post/update/:id', verifyRole(['user', 'admin', 'landlord']), wrapError(ctrlPost.update));
routerPost.delete('/post/delete/:id', verifyRole(['user', 'admin', 'landlord']), wrapError(ctrlPost.delete));


module.exports = routerPost;