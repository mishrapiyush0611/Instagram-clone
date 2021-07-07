
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
           console.log(result.user)
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
                    <h6 className="Name">{userProfile.user.email}</h6>
                    <div className="profile-content">
                        <h5>Posts 2</h5>
                        <h5>
                            Followers 400 </h5>
                        <h5> Followers 400
                        </h5>


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