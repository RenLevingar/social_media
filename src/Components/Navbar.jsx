import React from 'react'
import { Link } from 'react-router-dom';
import '../Styles/css/navbar.css';

// This function creates the navbar taht appears on all of the pages
const Navbar = () => {
  return (
    <nav className='navContainer'>
      <div className='navSection1'>
        <h1>Bloget</h1>
        <Link to={"/allposts"}>Home</Link>
        <Link to={"/myposts"}>My Posts</Link>
        <Link to={"/profile"}>Profile</Link>
      </div>
      <div className='navSection2'>
        <input type="text" placeholder='Search Blogs'/>
        <button className='searchBtn'>Search</button>
      </div>
    </nav>
  )
}

export default Navbar