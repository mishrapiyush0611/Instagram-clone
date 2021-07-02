import React, { useState ,useContext} from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
import { UserContext } from '../../App'
import './Login.css'
const Login = () => {
    const {state,dispatch}=useContext(UserContext)
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const LoginData = () => {
       
        fetch("/signin", {
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
                    localStorage.setItem("jwt",data.token)
                    localStorage.setItem("user",JSON.stringify(data.user))
                    dispatch({type:"User",payload:data.User})
                    M.toast({ html: "Login Success", classes: '#1b5e20 green darken-1' })
                    history.push('/')
                }
            })

    }

    return (
        <div className="mycard">
            <div className="card auth-card">

                <h2 className="brand-logo">Instagram</h2>

                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}>

                </input>
                <input
                    type="text"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}>

                </input>
                <button
                    class="btn waves-effect waves-light bttn  blue darken-1"
                    type="submit"
                    name="action"
                    onClick={() => LoginData()}>Submit
                    <i class="material-icons right"></i>
                </button>
                <h6 className="account-available" >
                    <Link to="/signup"> Don't have an account?</Link></h6>
            </div>
        </div>



    )
}
export default Login