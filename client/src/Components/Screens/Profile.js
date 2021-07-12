import React, { useEffect, useState,useContext } from 'react'
import { UserContext } from '../../App'

import './profile.css'
const Profile = () => {
    const {state,dispatch}=useContext(UserContext)
    const [pics,setpics]=useState([])
    useEffect(()=>{
        console.log(state,"pdudhdkxhkxhkdxhdsfkhskh")
        fetch('/mypost',{
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
          
           setpics(result.myposts)
           
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
    return (
        <div className="profile">
            <div className="profile-display">
                <div >
                    <img src={state?state.pic:""} className="profile-img"></img>
                </div>
                <div>
                    <h3 className="Name">{
                    state?state.name:"loading"}</h3>
                   
                    <div className="profile-content">
                        
                    {
                    pics.map(item=>{
                        console.log(item)
                        return(
                          
                       
                        <h5>{item.myposts} </h5>
                        
                        )
                    })
                }


                    </div>
                </div>
            </div>
            <div className="gallery">
                
                {
                    pics.map(item=>{
                        return(
                           
                        <img className="item" src={item.photo} alt={item.title}></img>
                    
                        
                        )
                    })
                }
                
            </div>


        </div>
    )
}
export default Profile