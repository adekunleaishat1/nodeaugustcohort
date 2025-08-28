const todomodel = require("../model/todo.model")
let currentUser = ''


const displayTodo = async(req, res) =>{
   try {
   if (!currentUser) {
   return res.redirect("/login")
  }
  const todos = await todomodel.find()
 
  res.render("todo", {todo: todos, user: currentUser,})
 } catch (error) {
  res.redirect("/login")
 }
}

module.exports = {displayTodo}
