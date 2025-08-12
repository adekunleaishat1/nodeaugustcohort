const express = require("express")
const app = express()
const ejs = require("ejs")


// middlewares
app.use(express.urlencoded())
app.set("view engine", "ejs")

let alluser = []
let alltodo = []

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
    res.render("signup")
})

app.get("/login",(req, res)=>{
    res.render("login")
})

app.get("/todo",(req, res)=>{
  res.render("todo", {todo: alltodo})
})

app.get("/edit/:index",(req, res)=>{
  console.log(req.params);
  const {index} = req.params
  console.log(alltodo[index] );
  const onetodo = alltodo[index] 
  res.render("edit",{onetodo})
})

app.post("/user/signup",(req, res)=>{
  console.log(req.body);
  alluser.push(req.body)
  res.redirect("/login")
})

app.post("/user/login",(req, res)=>{
    console.log(req.body);
    const {email , password} = req.body
   const existuser = alluser.find((user)=> user.email === email)
   console.log(existuser);
   if (existuser && existuser.password === password) {
     console.log("login successful");
     res.redirect("/")
   }else{
    console.log("invalid user");
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

const port = 8007

app.listen(port,()=>{
  console.log(`app started at port ${port}`);
  
})