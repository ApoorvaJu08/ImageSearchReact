import React, {useEffect, createContext, useReducer, useContext, useState} from 'react';
import './style.css';
import SearchBar from './SearchBar';
import BgAnimation from './BgAnimation';
import NavBar from './Navbar';
import {BrowserRouter,Route,Switch, useHistory} from 'react-router-dom'
import SignUp from './Signup';
import SignIn from './Signin';
import Profile from './Profile';
import Home from './Home';
import {reducer, initialState} from '../reducers/userReducer'

export const UserContext = createContext()

const Routing = ()=>{
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)
  const [parameter, setParameter] = useState("")
  const updateSearchParameter = (input) => {
    setParameter(input)
    history.push(`/search?${parameter}`)
  }
  
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type: "USER", payload: user})
      history.push('/')
    }else{
      history.push('/signin')
    }
  }, [])
    return(
      <Switch>
        <Route exact path="/" >
        <Home />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/search">
          <SearchBar updateQuery={updateSearchParameter} />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
      </Switch>
    )
  }

function App()  {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
          <BgAnimation />
          <NavBar />
          <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App;