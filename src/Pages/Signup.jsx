import {useState} from 'react';
import { Link } from 'react-router-dom';

const MultipleInputs = () => {
  // useStates
  const [person, setPerson] = useState({ name: "", email: "", age: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  // Whenever a value is changed it resets name and value
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({ ...person, [name]: value });
  };

  // Does everything neccessary for the submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //  Gets all of the users
      const users = await fetch('http://localhost:9000/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      });

      // If the previous request was successful it pulls all of the emails from the users
      if (users.ok) {
        const userData = await users.json();
        var emails = [];
        for(let i=0; i<userData.x.length; i++){
          let nums = Object.values(userData.x[i])
          emails.push(nums[2])
        }
      } else {
        console.log("request failed");
      }

      // Makes sure the current email doens't already exist
      if(!emails.includes(person.email)){
          const response = await fetch('http://localhost:9000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(person),
          });
          if (response.ok) {
          setPerson({ name: "", email: "", age: "", password: "" });
          window.location.replace('/');
          }
      } else {
        setErrorMessage(<h6>Error: Email already in use</h6>);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <div className='loginContainer'>
      <div className="loginImg">
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/mobile-face-recognition-5650391-4708010.png?f=webp" alt="Login Cartoon" />
        </div>
      <div className='loginForm'>
      
      <article className='form'>
        <h1 className="loginTitle">Register For Your Account</h1>
        <p className="loginSubTitle">Register To Use Our Site</p>
        
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Username: </label>
            <br />
            <input name="name" type='text' value={person.name} onChange={handleChange} className='loginInput' placeholder='Enter Your Username' /><br />
          </div>
          <br />
          <div>
            <label htmlFor="email">Email: </label>
            <br />
            <input name="email" type='email' value={person.email} onChange={handleChange} className='loginInput' placeholder='Enter Your Email' /><br />
          </div>
          <br />
          <div>
            <label htmlFor="age">Age: </label>
            <br />
            <input name="age" type='text' value={person.age} onChange={handleChange} className='loginInput' placeholder='Enter Your Age' /><br />
          </div>
          <br />
          <div>
            <label htmlFor="password">Password: </label>
            <br />
            <input name="password" type='password' value={person.password} onChange={handleChange} className='loginInput' placeholder='Enter Your Password' /><br />
          </div>
          {errorMessage}
          <br />
          <button type='submit' className='loginButton'>Sign Up</button>
          <br />
          <p className="otherTitle">Or Login With</p>
              <div className="loginOther">
                  <div className="appleLogin socialLogin">
                    <img src="https://pngimg.com/d/apple_logo_PNG19666.png" alt="Apple" />
                  </div>
                  <div className="googleLogin socialLogin">
                    <img src="https://img.freepik.com/freie-ikonen/chrom_318-674221.jpg" alt="Google" />
                  </div>
                  <div className="facebookLogin socialLogin">
                    <img src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/facebook_circle_color-512.png" alt="Facebook" />
                  </div>
              </div>
              <br />
              <p className="wrongPage">
                Already Have An Account? <Link to={"/"}><span className="loginRedirect">Login Here</span></Link>
              </p>
        </form>
        
      </article>
      </div>
      </div>
    </>
  );
};

export default MultipleInputs;