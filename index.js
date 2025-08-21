const express = require("express")
const app = express()
const ejs = require("ejs")
const mongoose = require("mongoose")
require("dotenv").config()

// CRUD CREATE READ UPDATE DELETE
// middlewares
app.use(express.urlencoded())
app.set("view engine", "ejs")

 const userschema =  mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    profilepicture:{type:String}
 })
const usermodel = mongoose.model("users_collection", userschema)

let alluser = []
let alltodo = []
let currentUser = ''
let errormessage= ""

app.get("/",(request, response)=>{
//   response.send("Welcome to your node class")
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
})

app.get("/user",(req, res)=>{
    // res.send("welcome to your dashboard lola")
    res.render("index",{name:"Lola", gender:"male"})
})

app.get("/signup", (req, res)=>{
    res.render("signup",{errormessage})
})

app.get("/login",(req, res)=>{
    res.render("login")
})

app.get("/todo",(req, res)=>{
  if (!currentUser) {
   return res.redirect("/login")
  }
  res.render("todo", {todo: alltodo, user: currentUser})
})


app.get("/edit/:index",(req, res)=>{
  console.log(req.params);
  const {index} = req.params
  console.log(alltodo[index] );
  const onetodo = alltodo[index] 
  res.render("edit",{onetodo,index})
})

app.post("/user/signup", async (req, res)=>{
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
})

app.post("/user/login", async(req, res)=>{
    try {
       console.log(req.body);
       const {email , password} = req.body
       const existuser = await usermodel.findOne({email})
        
       if (existuser && existuser.password === password) {
          console.log("login successful");
          currentUser = existuser.email
          res.redirect("/todo")
        }else{
          console.log("invalid user");
          res.redirect("/login")
        }
    } catch (error) {
      res.redirect("/login") 
    }

    
})

app.post("/addtodo",(req, res)=>{
  // console.log(req.body);
   alltodo.push(req.body)
   console.log(alltodo);
   res.redirect("/todo")
}) 

app.post("/todo/delete",(req, res)=>{
  console.log(req.body);
  const {index} = req.body
  alltodo.splice(index, 1)
  res.redirect("/todo")
})

app.post("/todo/update/:index",(req, res)=>{
   console.log(req.body, "new information");
   const {index} = req.params
   console.log(alltodo[index], "old information");
   alltodo[index] = req.body
   res.redirect("/todo")
})


const uri = process.env.MONGOURI

const connect = async() =>{
  try {
     const connection =  await mongoose.connect(uri)
     if (connection){
      console.log("database connected successfully");
     }
  } catch (error) {
    console.log(error); 
  }
}
connect()

const port = 8007

app.listen(port,()=>{
  console.log(`app started at port ${port}`);
  
})