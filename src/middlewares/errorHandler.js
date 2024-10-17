const HttpError = require('../libs/httpError');
const { NextFunction, Request, Response } = require('express');

const isDevelopment = process.env.NODE_ENV !== 'production';

const errorHandler = (err, _req, res, _next) => {
    const status = err instanceof HttpError ? err.statusCode : 500;
    const message = err.message || 'Internal server error';

    if (isDevelopment) {
        console.error(err);
    } else {
        console.error(message);
    }

    res.status(status).json({
        status,
        message,
        ...(isDevelopment ? { stack: err.stack } : {})
    });
};
module.exports = errorHandler;