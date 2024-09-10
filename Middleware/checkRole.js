function checkAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).send('Xac nhan la Admin.');
    }
}

function checkUser(req, res, next) {
    if (req.user && req.user.role === 'user') {
        next();
    } else {
        res.status(403).send('Xac nhan la User.');
    }
}

module.exports = { checkAdmin, checkUser };
