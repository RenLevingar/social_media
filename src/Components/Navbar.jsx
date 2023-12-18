import React from 'react'
import { Link } from 'react-router-dom';

// This function creates the navbar taht appears on all of the pages
const Navbar = () => {
  return (
    <header>
        <h1>Bloget</h1>
        <Link to={"/allposts"}>Home</Link>
        <Link to={"/myposts"}>My Posts</Link>
        <Link to={"/profile"}>Profile</Link>
    </header>
  )
}

export default Navbar