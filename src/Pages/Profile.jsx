import { useState, useEffect } from 'react';
import Header from '../Components/Navbar';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  // gets the user from the saved local storage
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  useEffect(() => {
    if(loggedInUser == null){
      navigate('/')
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
    </>
  );
};

export default Profile;
