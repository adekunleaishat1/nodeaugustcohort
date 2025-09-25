const express = require("express")
 const userrouter = express.Router()
const {userSignup, userLogin, verifytoken, verifyemail, UpdateProfile} = require("../controller/user.controller")
const  authtoken = require("../middleware/sessionservice")
const validatepayload = require("../middleware/Validator")
const validationaSchema = require("../middleware/user.validation")


userrouter.post("/signup", validatepayload(validationaSchema), userSignup)
userrouter.post("/login", userLogin)
userrouter.get("/verify/token", verifytoken)
userrouter.get("/verify/email/:email", verifyemail)
userrouter.patch("/upload/profile",authtoken, UpdateProfile)



module.exports = userrouter