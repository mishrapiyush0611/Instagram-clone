import React, { useEffect, createContext, Fragment ,useReducer, useContext} from 'react'
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route,useHistory } from 'react-router-dom'
import Home from './Components/Screens/Home';
import Login from './Components/Screens/Login';
import Signup from './Components/Screens/Signup';
import Profile from './Components/Screens/Profile';
import CreatePost from './Components/Screens/Createpost';
import UserProfile from './Components/Screens/UserProfile';
import { reducer,initialstate } from './Components/Reducers/useReducer';

export const UserContext = createContext()


const Routing = () => {
  const history= useHistory()
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"User",payload:user})
      history.push("/")
    }
    else{
      history.push("/login")
    }
  },[])
  return (
  <Fragment>
    <Route exact path='/'>
      <Home></Home>
    </Route>
    <Route path='/Login'>
      <Login></Login>
    </Route>
    <Route path='/Signup'>
      <Signup></Signup>
    </Route>
    <Route exact path='/Profile'>
      <Profile></Profile>
    </Route>
    <Route path='/Createpost'>
      <CreatePost></CreatePost>
    </Route>
    <Route path='/Profile/:id'>
      <UserProfile></UserProfile>
    </Route>
  </Fragment>
  )
}


function App() {
 const [state,dispatch]=useReducer(reducer,initialstate)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <Navbar />
      <Routing/>

      </BrowserRouter>
      </UserContext.Provider>
   
  );
}

export default App;
