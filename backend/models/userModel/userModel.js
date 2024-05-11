const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const crypto = require('crypto');



// User Model
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        validate:[validator.isEmail,"Please Enter a valid email"],
        unique:true

    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minLength:[8,"Password must be at least 8 characters"],
        select:false
    },
    avatar:{
        public_Id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        required:true,
        default:"admin"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
});


// Password Hash
userSchema.pre("save", async function(next){
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcryptjs.hash(this.password,10)
});


// Compare Password 
userSchema.methods.comparePassword = async function(password){
    return await bcryptjs.compare(password,this.password)
};

// Generate Jwt Token
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES
    })
};


// Create a reset Token
userSchema.methods.getResetPasswordToken = function(){

    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now()+15 * 60 * 1000;

    return resetToken;
}


module.exports = mongoose.model("User",userSchema);