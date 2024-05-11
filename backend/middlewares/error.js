const ErrorHandler = require('../utils/ErrorHandler');


module.exports = (err,req,res,next) => {

    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;


    // Invalid Url Error
    if (err.name === "CastError") {
        const message = `Resource Not Found. Invalid:${err.path}`;
        err = new ErrorHandler(message,500);
    }

    // Duplicate Email Entered
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;

        err = new ErrorHandler(message,500);
    }

    // Invalid Json Web Token Entered Error
    if (err.name === 'InvalidJsonWebToken') {
        const message = `Your Token Invalid. Please Try Again`;
        err = new ErrorHandler(message,500);
    }

    // Json Web Token Expired Error
    if (err.name === 'JsonWebTokenExpired') {
        const message = `Your token has expired. Please Try again`
        err = new ErrorHandler(message,500);

    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })

};