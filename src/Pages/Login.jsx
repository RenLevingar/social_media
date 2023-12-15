import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';

const Login = () => {
  const [person, setPerson] = useState({ email: "", password: "" });
  const [people, setPeople] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9000/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const dataFromServer = await response.json();
          setData(dataFromServer);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({ ...person, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (person.password && person.email) {
      const newPerson = { ...person, id: new Date().toString() };
      setPeople([...people, newPerson]);
      setPerson({ email: "", password: "" });
      window.location.replace('/home');
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
          <button type='submit'>Login</button>
        </form>
      </article>
      <Link to={"/signup"}>Don't have an account? Sign Up</Link>
    </>
  );
}

export default Login;
