import { Link } from 'react-router-dom'
import './index.css'
import { useState } from 'react'



const Nav = ({onChange}) => {


    const handleSignOut = () => {
        fetch('/signout', {
            method: "DELETE",
        }).then(() => onChange(null));
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
                  <Link to="/signout" onClick={handleSignOut()}>SignOut</Link>
                  </li>
                                          
                  
              </ul>
          </nav>
        )
    }

export default Nav