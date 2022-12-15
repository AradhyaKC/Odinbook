const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const Schema = mongoose.Schema;

const UserSchema =new Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String, required:false, minLength:3, maxLength:100},
    googleId:{type:String, required:false},
    joinDate:{type:Date,required:false,},
    description:{type:String,required:false,minLenght:3},
    profilePicUrl:{
        name:String,
        data:Buffer,
        contentType:String
    },
});
UserSchema.plugin(findOrCreate);

module.exports = mongoose.model('User',UserSchema);