import React ,{useState}from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const [loading, setLoading] = useState(false)
    const [userdetail, setuserdetail] = useState({
        email:"",
        password:""
    })
     const navigate = useNavigate()
      const handleinputChange = (e) =>{
       console.log(e.target.value, e.target.name);
       const name = e.target.name
       const value =  e.target.value
       setuserdetail({...userdetail,[name]:value })
    }

    const loginuser = () =>{
         setLoading(true)
       axios.post("http://localhost:8007/user/login",userdetail)
       .then((res)=>{
        console.log(res);
        localStorage.setItem("auth_token", res.data.token)
          navigate("/dashboard")
       }).catch((err)=>{
         console.log(err);
        const errormessage = err.response.data?.message
         toast.error(errormessage)
       }).finally(()=>{
        setLoading(false)
       })
    }
  return (
    <div>
           <div className='w-50 mx-auto py-3 px-3'>
            <h1 className='text-center mt-3'>Login</h1>
            <Input name={"email"} type={"email"} sty={"form-control mt-3"} change={handleinputChange} placeholder={"Email"}/>
            <Input name={"password"} type={"password"} sty={"form-control mt-3"} change={handleinputChange} placeholder={"Password"}/>
            <Button loading={loading} onclick={loginuser} style={'btn btn-primary mt-3'} text={"Login"}/>
        </div>
    </div>
  )
}

export default Login