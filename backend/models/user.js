const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Please Enter your name']
    },
    email : {
        type : String,
        required : [true, 'Please Enter your E-mail ID'] ,
        validator : [validator.isEmail, 'Enter your valid E-mail ID'],
        unique : true
    },
    password : {
        type : String,
        select : false,
        required : [true, 'Please Enter your password'] ,
        minlength : [5, 'Password needs a minimum charcter length of 5']
    },
    avatar : {
        public_id: {
            type:String,
            required : true
            },
        url: {
            type:String,
            required : true
            }
    },
    role : {
        type : String,
        default : 'user'
    },
    createdAt : {
        type : String,
        default : Date.Now
    },
    
    resetPasswordToken: String,
    resetPasswordExpire: Date

});

// Password encryption & salting before saving the userSchema
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
});


// password compairing
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}



// Creating jwt for user
userSchema.methods.getJwtToken = function() {
    return jwt.sign({ id:this._id }, 'ashben2021', {
        expiresIn : '3d'
    });
};


// Password Reset Token
userSchema.methods.getPasswordResetToken = function () {

    // Token Genaration
    const resetToken = crypto.randomBytes(20).toString('hex');              // crypto generate random bytes

    // Token encryption
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')   // digest authentication

    // setting token expiry
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken
};


module.exports = mongoose.model('User', userSchema);