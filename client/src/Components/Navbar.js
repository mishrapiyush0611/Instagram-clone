import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'
const Navbar = () => {
  const history = useHistory()
  const { state, dispatch } = useContext(UserContext)
  const RenderList = () => {
    if (state) {
      return [

        <li><Link to="/Profile">Profile</Link></li>,
        <li><Link to="/CreatePost">Create Post</Link></li>,
        <button class="btn waves-effect waves-light  #c62828 red darken-3"
          type="submit"
          name="action"
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
        <li><Link to="/Login">Login</Link></li>,
        <li><Link to="Signup">Signup</Link></li>

      ]
  }
  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to={state ? "/" : "/login"} className="brand-logo left">Instagram</Link>
        <ul id="nav-mobile" className="right">

          {RenderList()}
        </ul>
      </div>
    </nav>
  )
}
export default Navbar