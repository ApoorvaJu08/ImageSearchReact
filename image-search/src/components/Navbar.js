import React, {useContext} from 'react'
import './Navbar.css'
import { Link, useHistory } from 'react-router-dom'
import {UserContext} from './App'

const NavBar = () => {
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()
    const renderList = () => {
        if(state){
            return[
                <li key="1" className="mobile"><Link to="/profile">Profile</Link></li>,
                <li  key="5" className="mobile">
                    <button className="btn"
                    onClick={()=>{
                    localStorage.clear()
                    dispatch({type:"CLEAR"})
                    history.push('/signin')
                    }}
                    >
                        Logout
                    </button>
                </li>
            ]
        }else{
            return[
                <li key="2" className="mobile"><Link to="/signin">Sign In</Link></li>,
                <li key="3" className="mobile"><Link to="/signup">Sign Up</Link></li> 
            ]
        }
    }  

    return (
        <nav>
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo">Collosal Images</Link>
                <ul id="nav-mobile" className="right">
                    {renderList()}
                </ul>
            </div>
        </nav>
    )
}

export default NavBar