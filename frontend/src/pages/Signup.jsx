import React, {useState} from 'react'
import Input from '../ui/Input'
import axios from "axios"
import { toast} from "react-toastify"
import {useNavigate} from "react-router-dom"
import Button from '../ui/Button'


const Signup = () => {
    const navigate = useNavigate()
    const [userdetail, setuserdetail] = useState({
        username:"",
        email:"",
        password:""
    })
   const [loading, setLoading] = useState(false)

    const handleinputChange = (e) =>{
       console.log(e.target.value, e.target.name);
       const name = e.target.name
       const value =  e.target.value
       setuserdetail({...userdetail,[name]:value })
    }
    const Register = () =>{
        setLoading(true)
        axios.post("http://localhost:8007/user/signup", userdetail)
        .then((res)=>{
            console.log(res);
             toast.success(res.data?.message)   
            setTimeout(() => {
                  navigate("/login")
            }, 3000);
        }).catch((err)=>{
            console.log(err);  
            let errormessage = err.response.data?.message  
            toast.error(errormessage)
        }).finally(()=>{
            setLoading(false)
        })
    }

  return (
    <div>
        <div className='w-50 mx-auto py-3 px-3'>
            <h1 className='text-center mt-3'>Sign Up</h1>
            <Input name={"username"} type={"text"} sty={"form-control mt-3"} change={handleinputChange} placeholder={"Username"}/>
            <Input name={"email"} type={"email"} sty={"form-control mt-3"} change={handleinputChange} placeholder={"Email"}/>
            <Input name={"password"} type={"password"} sty={"form-control mt-3"} change={handleinputChange} placeholder={"Password"}/>
            <Button loading={loading} onclick={Register} style={'btn btn-primary mt-3'} text={"Sign Up"}/>
        </div>
       
    </div>
  )
}

export default Signup