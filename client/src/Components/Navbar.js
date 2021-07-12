import React, { useContext,useRef ,useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'
import M from 'materialize-css'
import './Navbar.css'
const Navbar = () => {
  const [search,setsearch]=useState('')
  const [userdetails,setuserdetails]=useState([])
  const Searchmodal=useRef(null)
  const history = useHistory()
  const { state, dispatch } = useContext(UserContext)
  useEffect(()=>{
    M.Modal.init(Searchmodal.current)
  },[])
  const RenderList = () => {
    if (state) {
      return [
        <li><i className="material-icons modal-trigger" data-target="modal1" style={{ color: "black",cursor:"pointer" }}>search</i></li>,
        <li><Link to="/Profile"  className="Navbar-link"><span>Profile </span><i class="material-icons right" id="icon1">person_pin</i></Link></li>,
        <li><Link to="/CreatePost"  className="Navbar-link"><span>CreatePost </span>  <i class="material-icons right" id="icon2">add_box</i></Link></li>,
        <button className="btn waves-effect waves-light  #c62828 red darken-3"
        id="nav-btn"
          type="submit"
          name="action"
          id="navbar"
          onClick={() => {
            localStorage.clear()
            dispatch({ type: "CLEAR" })
            history.push('/login')
          }
          }>Log Out

        </button>

      ]
    } else
      return [
        <li ><Link to="/Login" className="Navbar-link">Login</Link></li>,
        <li ><Link to="Signup" className="Navbar-link">Signup</Link></li>

      ]
  }
 const fetchusers=(query)=>{
   setsearch(query)
   fetch("/search-users", {
    method:"post",
    headers: {
     
      "Content-Type":"application/json",
      
    },
    body:JSON.stringify({
      query
  })
}).then(res => res.json())
    .then(results=>{
      console.log(results)
      setuserdetails(results.user)
    })
    .catch(err => {
        console.log(err)
    })
 }
  
  return (
    <nav>
      <div className="nav-wrapper grey lighten-4 w-100">
        <Link to={state ? "/" : "/login"} className="brand-logo left" id="navbar-home">Instagram</Link>
        <ul id="nav-mobile" className="right">

          {RenderList()}
        </ul>
        <div id="modal1" class="modal" ref={Searchmodal}>
    <div className="modal-content" style={{color:"black"}}>
    <input
                    type="text"
                    placeholder="Search Users"
                    value={search}
                    onChange={(event) => fetchusers(event.target.value)}>

                </input>
                <ul class="collection" >
                  {userdetails.map(item=>{
                   return <Link to={"/Profile/"+item._id} onClick={()=>( M.Modal.getInstance(Searchmodal.current).close())}><li class="collection-item" style={{width:"100%"}}> 
                   {item.email}</li></Link>
                   
                  })}
      

      
    </ul>
    </div>
    <div className="modal-footer">
      <button  className="modal-close waves-effect waves-green btn-flat">Cancel</button>
    </div>
  </div>
      </div>
    </nav>
  )
}
export default Navbar