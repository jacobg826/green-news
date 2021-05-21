import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css'


function NavBar() {
    
    return (
        <nav className='navBar'>
            <div className='navbar-container'>
                <Link to="/" className='navbar-logo'>
                    EARTH NEWS
                </Link>
                <ul className='nav-menu'>
                    <li className='nav-item'>
                        <Link to= "/about" className='styled-link'>ABOUT</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to ="/search" className='styled-link'>Search</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to= "/profile" className='styled-link'>PROFILE</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar