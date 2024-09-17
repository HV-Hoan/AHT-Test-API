const express = require('express');
const routers = require('./src/routers/authRouter');
const { errCheck } = require('./src/middlewares/errorHandler');
const app = express();
const port = 3030;

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');


app.use(express.json()); // Middleware cho việc xử lý JSON


app.use('/api', routers);


const linkOnline = 'mongodb+srv://admin:1@cluster0.flmz7.mongodb.net/mydatabase2'
const mongoURL = 'mongodb://localhost:27017/mydatabase2';
mongoose.connect(linkOnline)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server đang chạy tại http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('Lỗi khi kết nối MongoDB:', err);
    });


//app.use(errCheck());
module.exports = app;



