import React from 'react';
import './style.css';
import SearchBar from './SearchBar';
import BgAnimation from './BgAnimation';
import NavBar from './Navbar';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import SignUp from './Signup';
import SignIn from './Signin';
import Profile from './Profile';
import Home from './Home';

const Routing = ()=>{
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
          <SearchBar />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
      </Switch>
    )
  }

class App extends React.Component  {
    render() {
        return (
            <BrowserRouter>
                <BgAnimation />
                <NavBar />
                <Routing />
            </BrowserRouter>
        )
    }

}

export default App;