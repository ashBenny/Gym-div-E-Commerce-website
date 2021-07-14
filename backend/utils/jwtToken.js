

const sendToken  = (user,statuscode,res) => {

    // creating JWT
    const Token = user.getJwtToken();

    // cookie
    const options = {
        expires : new Date( Date.now() + 7 *24 * 60 * 60 * 1000),
        httpOnly : true                                                 
    };

    res.status(statuscode).cookie('token', Token, options).json({
        sucess : true,
        Token,
        user
    });

};


module.exports = sendToken;