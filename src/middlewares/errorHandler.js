const errorHandler = async (err, req, res, next) => {
    console.error('Có lỗi xảy ra:', err);
    // res.status(500).json({ message: 'Có lỗi xảy ra, nhưng server vẫn tiếp tục chạy.' });

    next();
};

module.exports = errorHandler;
