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
        <Link to={"/"}>Back</Link>
     </article>
    </>
  )
}

export default MultipleInputs