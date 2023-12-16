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
      <article className='form'>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Username: </label>
            <input name="name" type='text' value={person.name} onChange={handleChange} /><br />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input name="email" type='text' value={person.email} onChange={handleChange} /><br />
          </div>
          <div>
            <label htmlFor="age">Age: </label>
            <input name="age" type='text' value={person.age} onChange={handleChange} /><br />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input name="password" type='text' value={person.password} onChange={handleChange} /><br />
          </div>
          {errorMessage}
          <button type='submit'>Sign Up</button>
        </form>
        <Link to={"/"}>Back</Link>
      </article>
    </>
  );
};

export default MultipleInputs;
