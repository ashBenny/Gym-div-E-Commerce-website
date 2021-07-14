// some routs can access only by the autherised users.(frontend)

const User = require('../models/user');
const catchAsyncErrors = require('./catchAsyncErrors.js');
const ErrorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken')


// checking for autherised person to access particular routes

exports.isAuthenticatedUser  = catchAsyncErrors(async (req, res, next) => {
    
    const { token } = req.cookies

    if(!token) {
        return next(new ErrorHandler('Please Login', 401));
    };
    const verifiedUser = jwt.verify(token, 'ashben2021');
    req.user = await User.findById(verifiedUser.id);               // we allready have the user ID in the payload

    next()
});



// user roles HANDLING

exports.authorizeRoles = (...roles) => {
    return(req,res,next) => {
        if(!roles.includes(req.user.role)) {
            return next(new ErrorHandler('You are not allowed to access this task!!',403))
        };
        next();
    };
};