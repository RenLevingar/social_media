import { Link } from "react-router-dom";
import { useState } from 'react';
import '../Styles/css/login.css'

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
            window.location.replace('/allposts');
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
      <div className="loginContainer">
        <div className="loginImg">
          <img src="../Images/login.png" alt="Login Cartoon" />
        </div>
        <div className="loginForm">
            <article className='form'>
            <h1 className="loginTitle">Log In To Your Account</h1>

            <form onSubmit={handleSubmit} className='form'>
              <div className='form-control'>
                <label htmlFor="email">Email:</label>
                <br/>
                <input type="email" onChange={handleChange} name='email' id='email' className="loginInput"/>
              </div>
                <br />
              <div className='form-control'>
                <label htmlFor="password">Password:</label>
                <br />
                <input type="password" onChange={handleChange} name='password' id='password' className="loginInput"/>
              </div>
              <br />
              {errorMessage}
              <button type='submit' className="loginButton">Login</button>
              <div className="loginOther">
                  <div className="appleLogin socialLogin">
                    <img src="" alt="" />
                  </div>
                  <div className="googleLogin socialLogin">
                    <img src="" alt="" />
                  </div>
                  <div className="facebookLogin socialLogin">
                    <img src="" alt="" />
                  </div>
              </div>
              <p className="wrongPage">
                Don't have an account? <Link to={"/signup"}><span className="loginRedirect">Register Here</span></Link>
              </p>
              
            </form>
          </article>
        </div>
      </div>
    </>
  );
}

export default Login;