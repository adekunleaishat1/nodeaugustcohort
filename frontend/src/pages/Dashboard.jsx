import React, {useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const token = localStorage.getItem("auth_token")
    const navigate = useNavigate()
    useEffect(() => {
      axios.get("http://localhost:8007/user/verify/token",{
        headers:{
            "Authorization":`bearer ${token}`
        }
      })
      .then((res)=>{
        console.log(res);
        
      }).catch((err)=>{
        console.log(err);
        const errormessage = err.response.data?.message 
        if (errormessage == "jwt expired") {
            localStorage.removeItem("auth_token")
           navigate("/login") 
        }
      })
    }, [])
    
  return (
    <div>
        <h1>Welcome to your Dashboard!!!</h1>
    </div>
  )
}

export default Dashboard