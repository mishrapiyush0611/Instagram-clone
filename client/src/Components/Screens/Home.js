import React, { useEffect, useState,useContext } from 'react'
import {UserContext} from '../../App'
import './Home.css'
const Home = () => {
    const {state,dispatch}=useContext(UserContext)
    const [data, setdata] = useState([])
    useEffect(() => {
        fetch("/allpost", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result);
                setdata(result.posts)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const Likepost = (id) => {
        fetch("/like", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                const newdata = data.map(item=>{
                    if(item._id==result._id){
                      return result
                    }
                     else{
                         return  item
                     }
                  })
                  setdata(newdata)
                window.location.reload()

               
            }).catch(err => {
                console.log(err)
            })
    }

    const Unlikepost = (id) => {
        fetch("/unlike", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
        
              const newdata = data.map(item=>{
                  if(item._id==result._id){
                    return result
                  }
                   else{
                       return  item
                   }
                })
                setdata(newdata)
              
            }).catch(err => {
                console.log(err)
            })
    }
    const makecomment=(text,postId)=>{
        fetch("/comment", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId,
                text
            })
        }).then(res=>res.json())
        .then(result => {
             console.log(data)
            const newdata = data.map(item=>{
                if(item._id==result._id){
                  return result
                }
                 else{
                     return  item
                 }
              })
              setdata(newdata)
            }).catch(err=>{
                console.log(err)
            })
    }

    return (
  
        <div className="home" >
            {
                data.map(item => {
                   
                    
                    return (
                        

                        <div className="card home-card">
                             <h6 style={{float:"left"}}>{item.postedBy.name}</h6>
                            
                            <div className="card-image">
                                <img src={item.photo}></img>
                                <div className="card-title"></div>
                            </div>
                            <div className="card-content">
                                <i className="material-icons" style={{ color: "red" }}>favorite</i>
                                {item.likes.includes(state._id)
                                ?
                                <i className="material-icons" style={{cursor:"pointer"}} onClick={() => Unlikepost(item._id)}>thumb_down</i>
                                 :
                                 <i className="material-icons" style={{cursor:"pointer"}} onClick={() => Likepost(item._id)}>thumb_up</i>

                            }
                                <p>{item.likes.length} likes</p>
                                <p>{item.title}</p>
                               
                                <p>{item.body}</p>
                                {
                                    item.comments.map(record=>{
                                        return( 
                                            <span>{record.postedBy.name}<h5>{record.text}</h5></span>
                                        )
                                    })
                                }
                            </div>
                            <form onSubmit={event=>{
                                event.preventDefault()
                                makecomment(event.target[0].value,item._id)
                            }}>

                            <div className="card-action">
                                <input type='text' placeholder="Enter a comment"></input>
                            </div>
                            </form>
                        </div>
                    )
                })
            }


            

        </div>
    )

}
export default Home