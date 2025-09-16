const express = require("express")
 const userrouter = express.Router()
const {userSignup, userLogin, verifytoken, verifyemail} = require("../controller/user.controller")


userrouter.post("/signup", userSignup)
userrouter.post("/login", userLogin)
userrouter.get("/verify/token", verifytoken)
userrouter.get("/verify/email/:email", verifyemail)



module.exports = userrouter