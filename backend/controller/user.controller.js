const usermodel = require("../model/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const MailVerification = require("../utils/nodemailer")
const cloudinary = require("../utils/cloudinary")

const userSignup = async (req, res) =>{
    try {
        const { username, email , password} = req.body
        console.log(req.body);
        
        if (!username || !email || !password) {
            return res.status(400).json({message:"All fields are mandatory", status:false})
        }
         let newuser
        const hashedPassword = await bcrypt.hash(password,10)
        const link = `http://localhost:8007/user/verify/email/${email}`
       const mailsent =  await MailVerification(email, username, link)
          if (mailsent) {
            newuser = await usermodel.create({
            username,
            email,
            password:hashedPassword
            })
          }
       if (newuser) {
            return res.status(200).json({message:"Sign up successful", status:true})
        
       }
    } catch (error) {
       if (error.message.includes("E11000 duplicate key error ")) {
        return res.status(400).json({message:"User already Exist", status:false})
       }
        if (error.message.includes("buffering timed out")) {
         return res.status(500).json({message:"Network error", status:false})     
        }
      return res.status(500).json({message:error.message, status:false})
        
    }
}

const userLogin = async (req, res) =>{
   try {
     const {email , password} = req.body
     if (!email ||  !password) {
       return res.status(400).json({message:"All fields are mandatory", status:false})
     }
    const existuser = await usermodel.findOne({email})
    if (!existuser) {
     return res.status(400).json({message:"Invalid  email or password.", status:false}) 
    }
     const hashedPassword =  await bcrypt.compare(password, existuser.password)
       if (!hashedPassword) {
         return res.status(400).json({message:"Invalid  email or password.", status:false})
       }
        if (!existuser.verified) {
         return res.status(400).json({message:"email is not verified,check your email for verification mail.", status:false})
        }
      const token =  await jwt.sign({email:existuser.email,id:existuser._id}, process.env.JWT_SECRETKEY,{expiresIn:300} )
      return res.status(200).json({message:"Login successful", status:true, token})
   } catch (error) {
     return res.status(500).json({message:error.message, status:false})
   }
}

const verifytoken = async (req, res) =>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        console.log(token);
        
        if (!token) {
         return res.status(400).json({message:"Invalid  token", status:false})   
        }
        const verifytoken =   await jwt.verify(token, process.env.JWT_SECRETKEY)
        console.log(verifytoken);
        if (verifytoken) {
          return res.status(200).json({message:"token verified", status:true})
            
        }
    } catch (error) {
        console.log(error);
     return res.status(500).json({message:error.message, status:false})

        
    }
}

const verifyemail = async(req, res) =>{
  try {
    const {email} = req.params
    const user =  await usermodel.findOne({email})
    if(user){
      user.verified = true
      user.save()
      return  res.render("verify",{email})
    }
     return  res.render("verify",{email:""})
  } catch (error) {
    console.log(error);
     return  res.render("verify",{email:""})
  }
}


const UpdateProfile = async (req, res) =>{
  try {
    console.log(req.user);
    
    const {image} = req.body 
    if (!image) {
     return res.status(400).json({message:"Invalid image", status:false})    
    }
    const uploaded =  await cloudinary.uploader.upload(image)
    console.log(uploaded.secure_url);
    if (uploaded) {
     const user =   await usermodel.findByIdAndUpdate(
        req.user.id,
        {$set:{profilepicture:uploaded.secure_url}},
        {new:true}
        )
     return res.status(200).json({message:"profile image upload successful", status:true, user})    
    }
     return res.status(403).json({message:"unable to upload image", status:false})    
  } catch (error) {
     return res.status(500).json({message:error.message, status:false})
  }
}

module.exports = {userSignup, userLogin, verifytoken, verifyemail, UpdateProfile}