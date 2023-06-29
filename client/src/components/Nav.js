import { Link } from 'react-router-dom'
import './index.css'
import { useState } from 'react'



const Nav = ({user, userStatus}) => {

const Nav = ({ onSignOut }) => {
    const handleSignOut = () => {
        fetch('/logout', {
            method: "DELETE",
        }).then(() => onSignOut());
    }
  }
    return (
        <nav className="nav">
        <Link to="/boats" className="site-title">
        <img className='logo' src={process.env.PUBLIC_URL + "/images/logo.jpg"} alt='oops'/> 
        <span className='shop-name'>&nbsp; Pacific Boat Club</span>
              </Link>
              <ul>
                  <li className='nav-link-wrapper'>
                  <Link to="/boats">  Boats </Link>
                  </li>
    
                  <li className='nav-link-wrapper'>
                  <Link to="/owners">Members</Link>
                  </li>
    
                  <li className='nav-link-wrapper'>
                  <Link to='/boats/new'>Sell</Link>
                  </li>

                  <li className='nav-link-wrapper'>
                  <Link to="/signin">SignIn</Link>
                  </li>

                  <li className='nav-link-wrapper'>
                    <Link to="/signup">SignUp</Link>
                  </li>

                  <li className='nav-link-wrapper'>
                  <Link to="/signout">SignOut</Link>
                  </li>

                  <li className='nav-link-wrapper'>
                  <Link to="/home">About Us</Link>
                  </li>                                            
                  
              </ul>
          </nav>
        )
    }

export default Nav