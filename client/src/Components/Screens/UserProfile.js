
import React, { useEffect,useContext } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../App'

import './profile.css'
const Profile = () => {
    
    const [userProfile,setprofile]=useState(null)
    const{id}=useParams()
        console.log(id)
    useEffect(()=>{
        
        fetch(`/user/${id}`,{
            headers: {
                // "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
           console.log(result)
           setprofile(result)
           
        })
       
    },[])
    return (
        <>
        {userProfile ?  
        
        <div className="profile">
            <div className="profile-display">
                <div >
                    <img src={userProfile.user.pic} className="profile-img"></img>
                </div>
                <div>
                    <h3 className="Name">{userProfile.user.name}</h3>
                 
                    <div className="profile-content">
                        <h5>Posts {userProfile.posts.length}</h5>
                        


                    </div>
                </div>
            </div>
            <div className="gallery">
              
                {
                    userProfile.posts.map(item=>{
                        return(
                        <img className="item" src={item.photo} alt={item.title}></img>
                        )
                    })
                }
                
            </div>


        </div>
        
        
        :<h2>loading...</h2>   }
        
        </>
    )
}
export default Profile