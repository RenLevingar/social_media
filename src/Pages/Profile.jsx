import React from 'react'
import Header from "../Components/Navbar"
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <>
    <Header/>
    <h1>Profile</h1>
    <Link to={"/"}>Sign Out</Link>
    </>
  )
}

export default Profile