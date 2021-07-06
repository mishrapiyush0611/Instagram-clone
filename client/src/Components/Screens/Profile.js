import React, { useEffect, useState,useContext } from 'react'
import { UserContext } from '../../App'

import './profile.css'
const Profile = () => {
    const {state,dispatch}=useContext(UserContext)
    const [pics,setpics]=useState([])
    useEffect(()=>{
        fetch('/mypost',{
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => res.json())
        .then(result => {
           console.log(result)
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
                    <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bWVuJTIwZmFzaGlvbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" className="profile-img"></img>
                </div>
                <div>
                    <h3 className="Name">{state?state.name:"loading"}</h3>
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
                { console.log(pics)}
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