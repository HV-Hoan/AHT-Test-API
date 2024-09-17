function wrapError(fn) {
    return async function (req, res, next) {
        try {
            await fn(req, res, next); // Thực hiện hàm chính
        } catch (error) {
            console.error('Error caught:', error); // Log lỗi
            res.status(500).json({
                success: false,
                message: 'Something went wrong. Please try again later.',
                error: error.message
            });
        }
    };
}

module.exports = wrapError;
