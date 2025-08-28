
const express = require("express")
const todorouter = express.Router()
const {displayTodo} = require("../controller/todo.controller")


todorouter.get("/todo", displayTodo)


module.exports = todorouter