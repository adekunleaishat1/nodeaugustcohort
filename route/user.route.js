const express = require("express")
const userrouter = express.Router()
const {getlandingpage, displaySignup, UserSignup} = require("../controller/user.controller")


userrouter.get("/", getlandingpage)
userrouter.get("/signup", displaySignup)
userrouter.post("/user/signup", UserSignup)






module.exports = userrouter
