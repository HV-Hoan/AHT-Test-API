const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

var wrapError = require("./utils/wrapError");
const routers = require('./routers/1.authRouter');
const errCheck = require('./middlewares/errorHandler');

const port = process.env.PORT || 3030;
const mongoose = require('mongoose');
const linkOnline = 'mongodb+srv://admin:1@cluster0.flmz7.mongodb.net/mydatabase2'

async function connect() {
    try {
        await mongoose.connect(linkOnline);
    } catch (err) {
        console.error('Lỗi khi kết nối MongoDB:', err);
    }
}

function bootstrap() {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use('/uploads', express.static('publics'));

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '/views'));

    app.use(express.static(path.join(__dirname, 'publics')));

    app.use('/api', wrapError(routers));
    app.use(errCheck);

    server = app.listen(port, () => {
        console.log(`Server đang chạy tại http://localhost:${port}`);
    });
}

async function start() {
    try {
        await Promise.all([connect(), bootstrap()]);
    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
    }
}
start();
module.exports = app;