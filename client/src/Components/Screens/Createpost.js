import React, { useState,useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import M from 'materialize-css'
import './Createpost.css'

const CreatePost = () => {
  const history = useHistory()
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")

  useEffect(()=>{
    if(url){
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          title:title,
          body:body,
          photo: url
    
        })
      }).then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.error) {
    
            M.toast({ html: data.error, classes: "#c62828 red darken-2" })
          }
          else {
    
            M.toast({ html: "Post Created Successfully", classes: '#1b5e20 green darken-1' })
            history.push('/')
          }
        })
    }
    },[url])
  const Postdetails = () => {
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

  return (
    <div className="card Createpost">
      <h2 className="brand-logo">Instagram</h2>
      <div class="input-field col s12">
        {/* <textarea id="textarea1" class="materialize-textarea"></textarea> */}
        <input placeholder="Title" value={title} onChange={(event) => setTitle(event.target.value)}></input>
      </div>
      <div class="input-field col s12">
        {/* <textarea id="textarea1" class="materialize-textarea"></textarea> */}
        <input placeholder="Body" value={body} onChange={(event) => setBody(event.target.value)}></input>
      </div>
      <div class="file-field input-field">
        <div class="btn">
          <span>UPLOAD IMAGE</span>
          <input type="file" onChange={(event) => setImage(event.target.files[0])} />
        </div>
        <div class="file-path-wrapper">
          <input class="file-path validate" type="text" style={{ borderBottom: "0px white" }} />
        </div>
      </div>
      <button class="btn waves-effect waves-light blue darken-1" type="submit" name="action" onClick={() => Postdetails()}>Submit Post
        <i class="material-icons right"></i>
      </button>
    </div>
  )
}
export default CreatePost