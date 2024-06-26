const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require('../models/userModel/userModel');


exports.isAuthenticated = catchAsyncErrors(async (req,res,next)=>{

    const {token} = req.cookies;

    if (!token) {
        return next(new ErrorHandler(`Please login to access this resource`,400))
    };
    const decodedData = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next()

});

 