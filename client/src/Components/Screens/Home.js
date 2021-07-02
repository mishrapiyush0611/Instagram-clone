import React, { useEffect, useState } from 'react'
import './Home.css'
const Home = () => {
    const [data, setdata] = useState([])
    useEffect(() => {
        fetch("/allpost", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result.posts)
                setdata(result.posts)
            })
            .catch(err=>{
                console.log(err)
            })
    }, [])
    return (
        <div className="home" >
            {
            data.map(item=>{
                return(
                    <div className="card home-card">
                <div className="card-image">
                    <img src={item.photo}></img>
                    <div className="card-title"></div>
                </div>
                <div className="card-content">
                    <i class="material-icons" style={{ color: "red" }}>favorite</i>
                    <p>{item.title}</p>
                    <p>{item.body}</p>
                </div>

                <div className="card-action">
                    <input type='text' placeholder="Enter a comment"></input>
                </div>

            </div>
                )
            })
        }
            

            )
               
        </div>
    )

}
export default Home