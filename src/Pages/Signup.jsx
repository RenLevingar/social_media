import { useState } from 'react';
import { Link } from 'react-router-dom';

const MultipleInputs = () => {
  const [person, setPerson] = useState({ name: "", email: "", age: "", password: "" });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({ ...person, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:9000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(person),
      });

      if (response.ok) {
        console.log('success');
        setPerson({ name: "", email: "", age: "", password: "" });
        window.location.replace('/');
      } else {
        console.log('failed');
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
            <label htmlFor="name">Name: </label>
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
          <button type='submit'>Sign Up</button>
        </form>
        <Link to={"/"}>Back</Link>
      </article>
    </>
  );
};

export default MultipleInputs;
