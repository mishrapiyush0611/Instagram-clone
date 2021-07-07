import React,{useState,useEffect} from 'react'
import { Link ,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import './Login.css'
const Signup = () => {
    const history =useHistory()
     const[name,setName]=useState("")
     const[email,setEmail]=useState("")
     const[password,setPassword]=useState("")
     const[image,setImage]=useState("")
     const[url,setUrl]=useState(undefined)
     useEffect(()=>{
            if(url){
                uploadFields()
            }
     },[url])

     const UploadPic=()=>{
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "insta-clone")
        data.append("cloud_name", "instagram-piyush")
        fetch("https://api.cloudinary.com/v1_1/instagram-piyush/image/upload", {
          method: "post",
          body: data
    
        }).then(res => res.json())
          .then(data => {
            setUrl(data.url)
          })
          .catch(err => {
            console.log(err)
          })
     }
     const uploadFields=()=>{
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
                 pic:url

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
     const Postdata=()=>{

        if(image){
            UploadPic()
        }
        else{
            uploadFields()
        }

         
        
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
                <div class="file-field input-field">
        <div class="btn">
          <span>UPLOAD PIC</span>
          <input type="file" onChange={(event) => setImage(event.target.files[0])} />
        </div>
        <div class="file-path-wrapper">
          <input class="file-path validate" type="text" style={{ borderBottom: "0px white" }} />
        </div>
      </div>
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