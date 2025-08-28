const mongoose = require("mongoose")

const todoschema = mongoose.Schema({
  title: {type: String,required: true},
  description: {type: String, required: true}
})


const todomodel = mongoose.model("todo_collection", todoschema)

module.exports = todomodel