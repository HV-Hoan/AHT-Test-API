class HttpError extends Error {
    constructor(message = 'Internal Server Error', status = 500) {
        super(message);
        this.isHttpError = true;
        this.statusCode = status;
    }
}

module.exports = HttpError;
