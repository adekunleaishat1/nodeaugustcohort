const jwt = require("jsonwebtoken")
const usermodel = require("../model/user.model")

const Authtoken = async(req, res, next) =>{
try {
   const header = req.headers.authorization
   const token = header.split(" ")[1]
   if (!token) {
    return res.status(400).json({message:"Invalid Token", status:false})
   }
  const verifiedtoken = await jwt.verify(token, process.env.JWT_SECRETKEY)
   if (verifiedtoken) {
     const user =  await usermodel.findOne({email:verifiedtoken.email})
     if (!user) {
       return res.status(400).json({message:"Invalid user", status:false}) 
     }
     req.user = user
     return next()
   }  
     return res.status(400).json({message:"jwt malformed", status:false}) 
} catch (error) {
 return res.status(500).json({message:error.message, status:false}) 
}
}

module.exports = Authtoken