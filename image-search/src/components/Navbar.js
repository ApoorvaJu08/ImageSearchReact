import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

class NavBar extends React.Component {

    render() {
        return (
            <nav>
                <div class="nav-wrapper">
                <div class="brand-logo">Collosal Images</div>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><Link to="/signin">Sign In</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                </ul>
                </div>
            </nav>
        )
    }
}

export default NavBar