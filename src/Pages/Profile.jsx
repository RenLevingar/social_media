import { useState, useEffect } from 'react';
import Header from '../Components/Navbar';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState({});
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  useEffect(() => {
    setUser(loggedInUser);
  }, []);
  return (
    <>
      <Header />
      <h1>Profile</h1>
      <h2>{user.name}</h2>
      <Link to={'/'}>Sign Out</Link>
    </>
  );
};

export default Profile;
