import { Link } from 'react-router-dom'
import './index.css'
import { useState } from 'react'



const Nav = ({user, userStatus}) => {

  const handleToggle = () => {
    if (userStatus){
      return (
        <Link to="/signin">SignIn</Link>
      )
    } else {
      return (
        <Link to="/signout">SignOut</Link>
      )
    }
  }
    return (
        <nav className="nav">
        <Link to="/" className="site-title">
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

                  <li className='nav-link-wrapper' onClick={handleToggle}>
                  {userStatus ? "SignOut" : "SignIn"}
                  </li>

                  <li className='nav-link-wrapper'>
                    <Link to="/signup">Register as an owner</Link>
                  </li>
    
                  <li className='nav-link-wrapper'>
                  <Link to="/locations">Locations</Link>
                  </li>
                  
              </ul>
          </nav>
        )
    }

export default Nav