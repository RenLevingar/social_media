import {useState} from 'react'
import {Link} from 'react-router-dom'

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
        }
    }
  return (
    <>
    <article className='form'>
        <h1>Signup</h1>
        <form>
          <div>
            <label for="name">Name: </label><input name="name" type='text'/><br/>
          </div>
          <div>
            <label for="email">Email: </label><input name="email" type='text'/><br/>
          </div>
          <div>
            <label for="age">Age: </label><input name="age" type='text'/><br/>
          </div>
          <div>
            <label for="password">Password: </label><input name="password" type='text'/><br/>
          </div>
          <button type='submit' onSubmit={handleSubmit}>login</button>
        </form>
        <Link to={"/"}>Back</Link>
     </article>
    </>
  )
}

export default MultipleInputs