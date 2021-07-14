const User = require('../models/user');
const errorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors.js');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto');
const cloudinary = require('cloudinary');



// NEW USER REGISTRATION

exports.registerUser  = catchAsyncErrors( async(req,res,next) => {

    //Taking prodile image
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder:'avatar',
        width:150,
        crop:'scale'
    });
    
    const { name,email,password } = req.body

    const user = await User.create ({
        name,email,password,
        avatar : {
            public_id : result.public_id,
            url : result.secure_url
            }
    });

    
    // calling jwt function
    sendToken(user,200,res);
});



// USER LOGIN 

exports.loginUser  = catchAsyncErrors(async (req,res,next) => {
    
    const { email,password } = req.body;
    
    // checking for blank email/password
    if(!email) {
        return next(new errorHandler('Enter your Email ID', 400));
    };
    if(!password) {
        return next(new errorHandler('Enter your Password', 400));
    };
    
    //search for user in database
    const user = await User.findOne({email}).select('+password')
    
    if(!user) {
        return next(new errorHandler('Invalid User', 401));
    };
    
    //checks for the correct password
    const correctPassword = await user.comparePassword(password)
    
    if(!correctPassword) {
        return next(new errorHandler('Invalid Password', 401));
    }
   
    // calling jwt function
    sendToken(user,200,res);
    
});



// USER LOGOUT

exports.logout = catchAsyncErrors(async (req,res,next) => {
    res.cookie('token',null, {
            expires : new Date(Date.now()),
            httpOnly : true 
    });
    res.status(200).json({
        success : true,
        message : 'User Logout Sucessfully'
    });
});



// FORGOT PASSWORD

exports.forgotPassword = catchAsyncErrors(async (req,res,next) => {

    // check for the email user providing
    const user = await User.findOne({ email: req.body.email });

    if(!user) {
        return next(new errorHandler('Invalid Email.User not found', 404));
    };

    // Genarating the Password Reset token
    const resetPasswordToken = user.getPasswordResetToken();
    await user.save( {validateBeforeSave: false} );

    // Create password reset URL
    // const passwordResetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetPasswordToken}`;
    const passwordResetUrl = `${'http://localhost:3000'}/password/reset/${resetPasswordToken}`;

    // Sending message 
    const message = `Your password Reset Token is as : ${passwordResetUrl}`;

    // Sending EMail to user 
    try {
        await sendEmail({
            email : user.email,
            subject : 'Password Recovery Email',
            message
        })
        res.status(200).json({
            success : true,
            message : 'Password Recovery Email sent. Please check your Email'
        })
        
    } catch (error) {

        user.resetPasswordToken  = undefined;
        user.resetPasswordExpire  = undefined;

        await user.save( {validateBeforeSave: false} );
        
        return next(new errorHandler(error.message, 500));
        
    }

});


// RESET USER PASSWORD
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    // Hashing the token in URL
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    //Compairing this passwordReset Token with passwordResetToken in database
    const user = await User.findOne({
        resetPasswordToken,
        // resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new errorHandler('Password reset token is invalid or has been expired', 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new errorHandler('Password does not match', 400))
    }

    // set the new password & save
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res)
});



// GET USER PROFILE details

exports.getUserProfile = catchAsyncErrors(async (req,res,next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        sucess: true,
        user
    });
});



// UPDATE USER PROFILE DETAILS

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    // Update avatar
    if (req.body.avatar !== '') {
        const user = await User.findById(req.user.id)

        const image_id = user.avatar.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: "scale"
        })

        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})



// UPDATE USER PASSWORD

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('password');

    //checking the old password
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)
    if (!isPasswordMatched) {
        return next(new errorHandler('Wrong old password', 400));
    };

    user.password = req.body.password;
    await user.save();
    sendToken(user, 200, res);
});





//////////////////////////////////////////////////////////////////////////////////////////


// GET ALL USERS (BY ADMIN)

exports.allUsers = catchAsyncErrors(async (req,res,next) => {
    const users = await User.find();

    res.status(200).json({
        sucess : true,
        TotalUsers : users.length,
        users
    });
});



// GET SINGLE USER DETAILS (BY ADMIN)

exports.getUserDetails = catchAsyncErrors(async (req,res,next) => {
    const user = await User.findById(req.params.id);

    if(!user) {
        return next(new errorHandler('User not found'), 404);
    };

    res.status(200).json({
        sucess : true,
        message : 'User details found',
        user
    });
});



// UPDATE USER DETAILS (BY ADMIN)


exports.updateUser = async (req, res, next) => {
    const updatedUserData = {
        name : req.body.name,
        email : req.body.email,
        role : req.body.role
    };
    const user = await User.findByIdAndUpdate(req.params.id, updatedUserData, {

        useFindAndModify: false
    })
    res.status(200).json({
        sucess: true,
        message : 'User updated successfully'
    });
};



// DELETE USER (BY ADMIN)

exports.deleteUser = catchAsyncErrors(async (req,res,next) => {
    const user = await User.findById(req.params.id);

    if(!user) {
        return next(new errorHandler('User Not Found'),404);
    };

    await user.remove();

    // Need to remove image also

    res.status(200).json({
        sucess: true,
        message : 'User deleted successfully'
    });
});


