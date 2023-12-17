import { Link } from "react-router-dom";
import { useState } from 'react';

const Login = () => {
  const [person, setPerson] = useState({ email: "", password: "" });
  const [people, setPeople] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({ ...person, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (person.password && person.email) {
      try {
        //  Gets all of the users
        const users = await fetch('http://localhost:9000/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const userData = await users.json();

        // If the previous request was successful it pulls all of the emails from the users
        if (users.ok) {
          var emails = [];
          for(let i=0; i<userData.x.length; i++){
            let nums = Object.values(userData.x[i])
            emails.push(nums[2])
          }
        } else {
          console.log("request failed");
        }

        // Same thing as above but for passwords
        if (users.ok) {
          var passwords = [];
          for(let i=0; i<userData.x.length; i++){
            let nums = Object.values(userData.x[i])
            passwords.push(nums[4])
          }
        } else {
          console.log("request failed");
        }

        // checks to see if the password and email are correct
        if(emails.includes(person.email)){
          const indexEmail = emails.findIndex((email) => email === person.email);
          if(passwords[indexEmail] === person.password){
            const newPerson = { ...person, id: new Date().toString() };
            localStorage.setItem('loggedInUser', JSON.stringify(userData.x[indexEmail]));
            setPeople([...people, newPerson]);
            setPerson({ email: "", password: "" });
            window.location.replace('/home');
          } else {
            setErrorMessage(<h6>Incorrect password</h6>);
          }
        } else {
          setErrorMessage(<h6>This user doesn't exist</h6>);
        }
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <>
      <article className='form'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className='form'>
          <div className='form-control'>
            <label htmlFor="email">Email:</label>
            <input type="email" onChange={handleChange} name='email' id='email' />
          </div>
          <div className='form-control'>
            <label htmlFor="password">Password:</label>
            <input type="password" onChange={handleChange} name='password' id='password' />
          </div>
          {errorMessage}
          <button type='submit'>Login</button>
        </form>
      </article>
      <Link to={"/signup"}>Don't have an account? Sign Up</Link>
    </>
  );
}

export default Login;