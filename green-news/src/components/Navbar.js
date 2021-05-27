import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css'


function NavBar() {
    
    return (
        <nav className='navBar'>
            <div className='navbar-container'>
                <Link to="/" className='navbar-logo'>
                    earth news
                </Link>
                <ul className='nav-menu'>
                    <li className='nav-item'>
                        <Link to= "/about" className='styled-link'>about</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar