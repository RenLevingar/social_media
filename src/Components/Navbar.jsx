import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <ul>
        <li><Link to={"/allposts"}>Home</Link></li>
        <li><Link to={"/myposts"}>My Posts</Link></li>
        <li><Link to={"/profile"}>Profile</Link></li>
    </ul>
  )
}

export default Navbar