import { useState, useEffect } from 'react';
import Header from '../Components/Navbar';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState({});
  // gets the user from the saved local storage
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  useEffect(() => {
    if(loggedInUser == null){
      window.location.replace('/')
    }
    setUser(loggedInUser);
     // eslint-disable-next-line
  }, []);

  const signOut = () => {
    localStorage.removeItem('loggedInUser');
  }
  return (
    <>
      <Header />
      <h1>Profile</h1>
      <h2>{user.name}</h2>
      <Link to={'/'} onClick={signOut}>Sign Out</Link>
    </>
  );
};

export default Profile;
