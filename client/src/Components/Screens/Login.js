import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
import insta from '../Images/login-pic.jpg'
import { UserContext } from '../../App'
import './Login.css'
const Login = () => {
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const LoginData = () => {

        fetch("/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({
                email,
                password,

            })
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.error) {

                    M.toast({ html: data.error, classes: "#c62828 red darken-2" })
                }
                else {
                    window.location.reload();
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("user", JSON.stringify(data.user))
                    dispatch({ type: "User", payload: data.User })
                    M.toast({ html: "Login Success", classes: '#1b5e20 green darken-1' })
                    history.push('/')

                }
            })

    }

    return (
        <>
            <div className="home">
               

                <div className="mycard">
                    
                
                    <img src={insta}></img>
                   
                
                    <div className="auth-card">
        
                        <h2 className="brand-logo">Instagram</h2>
                        <input
                            type="text"
                            placeholder="Username"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}>

                        </input>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}>

                        </input>
                        
                        <button
                            class="btn waves-effect waves-light bttn  black darken-0"
                            id="submit-btn"
                            type="submit"
                            name="action"

                            onClick={() => LoginData()}>Submit
                            <i class="material-icons right"></i>
                        </button>
                
                      
                        <h6 className="account-available" >Don't Have an Account?
                        </h6>
                            <button  className="btn waves-effect waves-light bttn  purple lighten-3" style={{color:"white"}} ><Link to="/signup"  > Signup</Link></button>
                    </div>
                </div>
            </div>
        </>


    )
}
export default Login