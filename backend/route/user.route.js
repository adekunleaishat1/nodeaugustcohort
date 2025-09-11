const express = require("express")
 const userrouter = express.Router()
const {userSignup, userLogin, verifytoken} = require("../controller/user.controller")


userrouter.post("/signup", userSignup)
userrouter.post("/login", userLogin)
userrouter.get("/verify/token", verifytoken)



module.exports = userrouter