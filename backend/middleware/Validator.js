
const validatepayload = (schema) => async (req, res, next) =>{
  try {
     const body = req.body
     if (body) {
      const validated = await schema.validate(body)  
      if (validated) {
        next()
      }
     }
  } catch (error) {
    return res.status(400).json({message:error.message, status:false})
  }
}

module.exports = validatepayload