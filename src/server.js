const express = require('express');
const routers = require('./routers/authRouter');
const errCheck = require('./middlewares/errorHandler');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const port = 3030;
const mongoose = require('mongoose');
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

app.use(express.json()); // Middleware cho việc xử lý JSON


app.set('view engine', 'ejs');// Cấu hình view engine là EJS
app.set('views', path.join(__dirname, '/views'));// Đảm bảo Express biết tìm các file view trong thư mục 'views'

app.use('/api', routers);
// app.use(errCheck);

module.exports = app;