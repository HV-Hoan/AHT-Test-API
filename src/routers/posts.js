var express = require('express');
var routerPost = express.Router();
var ctrlPost = require("../controllers/posts");

var verifyRole = require("../middlewares/checkRole");
var wrapError = require("../middlewares/wrapError");


//Post
routerPost.get('/post/list', wrapError(ctrlPost.list));

routerPost.get('/post/add', verifyRole(['admin', 'landlord', 'user']), wrapError(ctrlPost.addPost));
routerPost.post('/post/add', verifyRole(['admin', 'landlord', 'user']), wrapError(ctrlPost.addPost));

routerPost.get('/post/update/:id', wrapError(ctrlPost.update));
routerPost.put('/post/update/:id', wrapError(ctrlPost.update));

routerPost.get('/post/delete/:id', wrapError(ctrlPost.delete));
routerPost.delete('/post/delete/:id', wrapError(ctrlPost.delete));


module.exports = routerPost;