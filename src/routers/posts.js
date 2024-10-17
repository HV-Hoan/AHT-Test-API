const express = require('express');
const multer = require('multer');
const routerPost = express.Router();
const ctrlPost = require("../controllers/posts");
//const upload = new multer({ dest: './src/pubic/images' });

const verifyRole = require("../middlewares/checkRole");
const wrap = require('../utils/wrapError');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/publics/public");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});


var upload = multer({ storage: storage });

routerPost.get('/list', verifyRole(['admin']), wrap(ctrlPost.list));


routerPost.get('/add', wrap(ctrlPost.addPost));
routerPost.post('/add', verifyRole(['admin']), upload.single('image'), wrap(ctrlPost.addPost));

routerPost.get('/update/:id', wrap(ctrlPost.update1));
routerPost.post('/update/:id', upload.single('image'), wrap(ctrlPost.update));

routerPost.get('/delete/:id', wrap(ctrlPost.delete));
routerPost.delete('/delete/:id', wrap(ctrlPost.delete));


module.exports = routerPost;