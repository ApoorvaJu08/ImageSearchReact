import React from 'react';
import axios from 'axios';
import './style.css';
import SearchBar from './SearchBar';
import Slide from './Slide';
import NoImgs from './NoImgs';
import BgAnimation from './BgAnimation';
import NavBar from './Navbar';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import SignUp from './Signup';
import SignIn from './Signin';
import Profile from './Profile';
import Home from './Home';
const API_KEY = process.env.REACT_APP_API_KEY

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
    state = { images: [] };
    
    onSearchSubmit = async (term) => {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
            params: { query: term},
            headers: {
                Authorization: `Client-ID ${API_KEY}`
            }
        })
        this.setState({ images: response.data.results })
    }
    
    render() {
        return (
            <BrowserRouter>
                <BgAnimation />
                <NavBar />
                <Routing />
                {/* <Route path="/signup">
                    <SignUp />
                </Route>
                <Route path="/signin">
                    <SignIn />
                </Route>
                <Route path="/profile">
                    <Profile />
                </Route> */}
            </BrowserRouter>
            // <div>
            //     <BgAnimation />
            //     <SearchBar />
            // </div>
        )
    }

}

export default App;