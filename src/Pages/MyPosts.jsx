import React, { useState, useEffect } from 'react';
import Header from '../Components/Navbar';
import BlogList from '../Components/BlogList';

const MyPosts = () => {
  // useStates
  const [user, setUser] = useState({});
  const [blog, setBlog] = useState({ title: '', content: '', author: '', img: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [blogs, setBlogs] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  // creates a function that gets all of the blogs
  const fetchBlogs = async () => {
    try {
      const blogsData = await fetch('http://localhost:9000/users/blog', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (blogsData.ok) {
        const blogsOutput = await blogsData.json();
        let finalBlogs = blogsOutput.x.filter(blog => blog.author === user.name);
        setBlogs(finalBlogs);
      } else {
        console.error('Failed to fetch blogs');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // use effect that prints all of the blogs
  useEffect(() => {
    if(loggedInUser == null){
      window.location.replace('/')
    }
    setUser(loggedInUser);
    fetchBlogs();
     // eslint-disable-next-line
  }, [user.name]);

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
        // creates a new blog when the info is successfully entered by the user
        const response = await fetch('http://localhost:9000/users/blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(blog),
        });
        if (response.ok) {
          fetchBlogs();
          setBlog({ title: '', content: '', author: user.name, img: '' });
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
        <h1>Create a blog:</h1>
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
        <div>
          <label htmlFor="img">Image(URL): </label>
          <input name="img" type="text" value={blog.img} onChange={handleChange} />
          <br />
        </div>
        <button type="submit">Create</button>
        {errorMessage}
      </form>
      <section>
        <h1>Blogs:</h1>
        <BlogList blogs={blogs} fetchBlogs={fetchBlogs}/>
      </section>
    </>
  );
};

export default MyPosts;
