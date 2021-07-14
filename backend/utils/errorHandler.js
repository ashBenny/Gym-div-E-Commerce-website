
class ErrorHandler extends Error {
    constructor(message,statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor)   // Its a functon of Error class and creates .stack property on a target object
    }
};

module.exports = ErrorHandler;


