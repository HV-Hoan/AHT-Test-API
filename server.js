const express = require('express');
const routers = require('./routers/products');
const account = require('./routers/account');

const mongoose = require('mongoose');

const app = express();
const port = 3030;

app.use(express.json()); // Middleware cho việc xử lý JSON

app.use('/account', account);
app.use('/api', routers);


const linkOnline = 'mongodb+srv://admin:1@cluster0.flmz7.mongodb.net/mydatabase2'
const mongoURL = 'mongodb://localhost:27017/mydatabase2';
mongoose.connect(linkOnline)
    .then(() => {
        console.log('Đã kết nối thành công với MongoDB');
    })
    .catch((err) => {
        console.error('Lỗi khi kết nối MongoDB:', err);
    });

app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
