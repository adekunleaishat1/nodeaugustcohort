import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
   const [image, setimage] = useState(null)
   const [user, setuser] = useState(null)
   
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

    const handleFileChange = (e) =>{
     console.log(e.target.files[0]);
      const file = e.target.files[0]
       const reader = new FileReader()
       reader.readAsDataURL(file)
       reader.onload = (e) =>{
         console.log(e.target.result);
         setimage(e.target.result)
       }
    }

    const Uploadimage  = () =>{
       axios.patch("http://localhost:8007/user/upload/profile",{image},{
        headers:{
            "Authorization":`bearer ${token}`
        }
      })
      .then((res)=>{
        console.log(res.data);
        if (res.data?.user) {
           setuser(res.data.user)
        }
      }).catch((err)=>{
        console.log(err);
        const errormessage = err.response.data?.message 
        if (errormessage == "jwt expired") {
            localStorage.removeItem("auth_token")
           navigate("/login") 
        }
      })
    }
    
  return (
    <div>
        <h1>Welcome to your Dashboard!!!</h1>
       <div>
        <input onChange={handleFileChange} type="file" />
        <button onClick={Uploadimage}>Upload</button>
       </div>
       <h1>{user && user.username}</h1>
       <img style={{width:"200px", height:"200px"}} src={user && user.profilepicture} alt="" />
     </div>
  )
}

export default Dashboard