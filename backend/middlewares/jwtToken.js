const sendToken = (user,statusCode,res) => {

    const token = user.getJWTToken();

    // Options for cookies 
    const options = {
        httpOnly: true,
        expires:new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    };

    res.status(statusCode).cookie("token",token,options).json({
        success: true,
        user,
        token
        
    })

}

module.exports = sendToken;