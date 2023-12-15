import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <ul>
        <li><Link to={"/home"}>Home</Link></li>
        <li><Link to={"/allposts"}>Posts</Link></li>
        <li><Link to={"/myposts"}>My Posts</Link></li>
        <li><Link to={"/profile"}>Profile</Link></li>
    </ul>
  )
}

export default Navbar