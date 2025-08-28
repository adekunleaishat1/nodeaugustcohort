

const usermodel = require("../model/user.model")
let errormessage = ""

const getlandingpage = (request, response) =>{
  response.json({
    "Users":[
        {"id":"1","name":"Ugonna", "age":"12", "food":"Akpu"},
        {"id":"2","name":"feranmi", "age":"16", "food":"rice"},
        {"id":"3","name":"emmanuel", "age":"14", "food":"spag"},
        {"id":"4","name":"ezekiel", "age":"15", "food":"garri"},
        {"id":"5","name":"folarin", "age":"16", "food":"pounded yam"},
        {"id":"6","name":"ayo", "age":"17", "food":"spag"},
        {"id":"7","name":"al-wajud", "age":"19", "food":"beans"},
        {"id":"8","name":"joshua", "age":"18", "food":"rice and beans"},
    ]
})
}

const displaySignup = (req, res) =>{
    res.render("signup",{errormessage})
}


const UserSignup = async (req, res) =>{
  try {
    console.log(req.body);
   const newuser =  await usermodel.create(req.body)
   console.log(newuser);
   if (newuser) {
      res.redirect("/login")
   }
  } catch (error) {
    if (error.message.includes("user_collection validation failed")) {
      errormessage = "All fields are mandatory"
      return  res.redirect("/signup")
    }
    if (error.message.includes("E11000 duplicate key error collection")) {
         errormessage = "User already exist"
      return  res.redirect("/signup")
    }
    console.log(error);
          res.redirect("/signup")
  }

}

module.exports = {getlandingpage, displaySignup, UserSignup}