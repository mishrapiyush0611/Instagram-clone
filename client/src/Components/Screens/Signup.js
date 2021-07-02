import React,{useState} from 'react'
import { Link ,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import './Login.css'
const Signup = () => {
    const history =useHistory()
     const[name,setName]=useState("")
     const[email,setEmail]=useState("")
     const[password,setPassword]=useState("")
     const Postdata=()=>{
         if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ .test(email)){
            M.toast({html: "Enter Correct Email" ,classes:"#c62828 red darken-3"})
            return 

         }
         fetch("/signup",{
             method:"post",
             headers:{
                 "Content-Type":"application/json",
             },
             body:JSON.stringify({
                 email,
                 name,
                 password,

             })
            }).then(res=>res.json())
            .then(data=>{
               if(data.error){
                M.toast({html: data.error ,classes:"#c62828 red darken-2"})
               }
               else{
                M.toast({html: data.message,classes:'#1b5e20 green darken-1'})
                history.push('/login')
               }
         })
        
     }
    return (
       
        
        <div className="mycard">
            <div className="card auth-card">

                <h2 className="brand-logo">Instagram</h2>
                <input 
                type="text" 
                placeholder="Name" 
                value={name}
                onChange={(event)=>setName(event.target.value)}>

                </input>
                

                <input 
                type="text"
                 placeholder="Email"
                 value={email}
                 onChange={(event)=>setEmail(event.target.value)}>

                </input>
                <input 
                type="text"
                 placeholder="Password"
                 value={password}
                 onChange={(event)=>setPassword(event.target.value)} >

                </input>
                <button class="btn waves-effect waves-light blue darken-1"
                 type="submit"
                 name="action"
                 onClick={()=>Postdata()}>Submit
                    <i class="material-icons right"></i>
                </button>
                <h6 className="account-available" >
                <Link to="/login"> Already have an account?</Link>
                    </h6>
            </div>
        </div>

    )
}
export default Signup