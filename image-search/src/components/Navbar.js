import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

class NavBar extends React.Component {

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo">Collosal Images</Link>
                    <ul id="nav-mobile" className="right">
                        <li className="hide-on-small-only"><Link to="/signin">Sign In</Link></li>
                        <li className="hide-on-small-only"><Link to="/signup">Sign Up</Link></li>
                        <li className="hide-on-small-only"><Link to="/profile">Profile</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavBar