const mongoose = require("mongoose")

 const userschema =  mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    profilepicture:{type:String}
 })
const usermodel = mongoose.model("users_collection", userschema)

module.exports = {usermodel}