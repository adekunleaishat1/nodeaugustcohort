const yup = require("yup")
const usernameregex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{6,32}$/
const validationaSchema = yup.object({
    username:yup.string().min(3,"Usename cannot be less than three characters").matches(usernameregex, "username must be unique").required("username is required"),
    password:yup.string().trim().min(3,"password cannot be less than three characters").required("password is required"),
    email:yup.string().trim().email("Must be a valid email address").required("email is required"),
})


module.exports = validationaSchema