const express = require("express")
const app = express()
const ejs = require("ejs")
const mongoose = require("mongoose")
require("dotenv").config()
const connect = require("./database/db.connect")
const {usermodel} = require("./model/user.model")
const userrouter = require("./route/user.route")
const todorouter = require("./route/todo.route")

// CRUD CREATE READ UPDATE DELETE
// middlewares
app.use(express.urlencoded())
app.set("view engine", "ejs")
app.use("/",userrouter)
app.use("/",todorouter)




let alluser = []
let alltodo = []

let errormessage= ""



app.get("/user",(req, res)=>{
    // res.send("welcome to your dashboard lola")
    res.render("index",{name:"Lola", gender:"male"})
})



app.get("/login",(req, res)=>{
    res.render("login")
})




app.get("/edit/:id",async(req, res)=>{
 try {
    console.log(req.params);
  const {id} = req.params
  const onetodo = await todomodel.findById(id)
  res.render("edit",{onetodo})
 } catch (error) {
  res.redirect("/todo")
   
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
app.post("/addtodo", async(req,res)=>{
  try {
    const task = await todomodel.create(req.body)
    if (task) {
      console.log("task added successfully");
      res.redirect("/todo")
    }
  } catch (error) {
    console.log(error);
    
  }
})

// app.post("/addtodo",(req, res)=>{
//   // console.log(req.body);
//    alltodo.push(req.body)
//    console.log(alltodo);
//    res.redirect("/todo")
// }) 

app.post("/todo/delete", async (req, res)=>{
 try {
   const {id} = req.body
  const deletedTodos = await todomodel.deleteOne({_id:id})
    // await todomodel.findByIdAndDelete(id)
    if (deletedTodos) {
        res.redirect("/todo")
    }
 } catch (error) {
  console.log(error);
    res.redirect("/todo")
 }
})



app.post("/todo/update/:id", async(req, res)=>{
  try {
      console.log(req.body, "new information");
      const {id} = req.params
   const updatedTodo =  await todomodel.findByIdAndUpdate(
      id,
      req.body
     )
     if (updatedTodo) {
         res.redirect("/todo")
     }
  } catch (error) {
       res.redirect("/todo")
  }
 

  //  console.log(alltodo[index], "old information");
  //  alltodo[index] = req.body
 
})



connect()
const port = 8007

app.listen(port,()=>{
  console.log(`app started at port ${port}`);
  
})