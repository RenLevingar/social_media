import React, { useState, useEffect } from 'react';
import Header from '../Components/Navbar';
import BlogList from '../Components/BlogList';
import {useNavigate} from 'react-router-dom'
import '../Styles/css/allBlogs.css';

const MyPosts = () => {
  const navigate = useNavigate();
  // useStates
  const [user, setUser] = useState({});
  const [blog, setBlog] = useState({ title: '', content: '', author: '', img: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [blogs, setBlogs] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  // creates a function that gets all of the blogs
  const fetchBlogs = async () => {
    try {
      const blogsData = await fetch('https://main--unrivaled-dusk-f57e8e.netlify.app/users/blog', {
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
      navigate('/')
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
        const response = await fetch('https://main--unrivaled-dusk-f57e8e.netlify.app/users/blog', {
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
      <h1 className='createBlogTitle'>Create A New Blog:</h1>
    <form className="createBlogForm" onSubmit={handleSubmit}>
  <div>
    <label htmlFor="title">Title: </label>
    <input name="title" type="text" value={blog.title} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="content">Content: </label>
    <textarea name="content" value={blog.content} onChange={handleChange}></textarea>
  </div>
  <div>
    <label htmlFor="img">Image(URL): </label>
    <input name="img" type="text" value={blog.img} onChange={handleChange} />
  </div>
  <button type="submit">Create</button>
  <div className="errorMessage">{errorMessage}</div>
</form>


      <section>
        <h1 className='myBlogTitle'>My Blogs:</h1>
        <BlogList blogs={blogs} fetchBlogs={fetchBlogs}/>
      </section>
    </>
  );
};

export default MyPosts;
