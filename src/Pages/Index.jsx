import { Link } from "react-router-dom";

import {useState} from 'react'

const MultipleInputs = () => {
    const [person, setperson] = useState({email:"", password: ""})
    const [people, setpeople] = useState([])

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setperson({...person,[name]:value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(person.password && person.email){
            const newPerson = {...person,id:new Date().toString()}
            setpeople([...people, newPerson])
            setperson({email: "", password: ""})
            console.log("success")
        }
    }
  return (
    <>
    <article className='form'>
        <form onSubmit={handleSubmit} className='form'>
            <div className='form-control'>
                <label htmlFor="email">Email:</label>
                <input type="email" onChange={handleChange}  name='email' id='email' />
            </div>
            <div className='form-control'>
                <label htmlFor="password">Password:</label>
                {/* note that for the password input below it is only temporailry set to type="text", but should be type="password" */}
                <input type="text" onChange={handleChange}  name='password' id='password' /> 
            </div>
            <button type='submit' onSubmit={handleSubmit}>login</button>
        </form>
     </article>
        {/* <article>
        {people.map((person)=>{
            const {id,email,password} = person
            return(
                <div className='item' key={id}>
                    <p>{email}</p>
                    <p>{password}</p>
                </div>
            )
        })}
    </article> */}
      <Link to={"/signup"}>Dont have an account? Sign Up</Link>
    </>
  )
}

export default MultipleInputs