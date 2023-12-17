import { useState, useEffect } from 'react';
import Header from '../Components/Navbar';

const MyPosts = () => {
  const [user, setUser] = useState({});
  const [blog, setBlog] = useState({ title: '', content: '', author: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  useEffect(() => {
    setUser(loggedInUser);
  }, []);

  // Sets values whenever the inputs are altered
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({ ...prevBlog, [name]: value, author: user.name }));
  };

  // Does everything necessary for the submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (blog.title && blog.content) {
        const response = await fetch('http://localhost:9000/users/blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(blog),
        });
  
        if (response.ok) {
          setBlog({ title: '', content: '', author: user.name });
        } else {
          setErrorMessage(<h6>Failed to create blog post</h6>);
        }
      } else {
        setErrorMessage(<h6>Both a title and content are needed</h6>);
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
      <Header />
      <h1>MyPosts</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input name="title" type="text" value={blog.title} onChange={handleChange} />
          <br />
        </div>
        <div>
          <label htmlFor="content">Content: </label>
          <input name="content" type="text" value={blog.content} onChange={handleChange} />
          <br />
        </div>
        <button type="submit">Create</button>
        {errorMessage}
      </form>
    </>
  );
};

export default MyPosts;
