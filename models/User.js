const { string } = require('joi');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
     
    // username   Automatically handle by PLM(passportLocalMongoose)
    // password

    email : {
        type:String,
        trim: true,
        required:true
    },
    role:{
        type:String,
        default:'buyer'
    },
    gender:{
        type:String,
        trim:true,
        required:true
    }
})

userSchema.plugin(passportLocalMongoose);  //always use between model and schema creating and apply on schema


const User = mongoose.model('User',userSchema)
module.exports = User