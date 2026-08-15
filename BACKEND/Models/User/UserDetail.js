const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true,
        min : 10
    },

    email: {
        type: String,
        required: true
    },

    nic: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    image: {
        data: Buffer,
        type: String
    },

    role: {
        type: String,
        default: "User",
    }
,

    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE"],
        default: "ACTIVE"
    }
}, {
    timestamps: true,
});

userSchema.pre('save',function(next){
    if(!this.isModified('password')) //check the password is modified or not
        return next()
    bcrypt.hash(this.password,10,(err,passwordHash)=>{
        if(err)
            return next(err);
        this.password = passwordHash; //overide the existing password
        next();
    });
});

userSchema.methods.comparePassword = function(password,cb){ //compare the plaintext password with the hashed password
    bcrypt.compare(password,this.password,(err,isMatch)=>{
        if(err)
            return cb(err);
        else{
            if(!isMatch)
                return cb(null,isMatch);
            return cb(null,this);
        }
    });
}

const User = mongoose.model("user", userSchema);

module.exports = User;