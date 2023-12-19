import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import '../Styles/css/blog.css'
const Blog = () => {
  // useState
  const [blog, setBlog] = useState({});

  // Gets blog id
  const viewBlog = localStorage.getItem('viewBlog');

  // gets all the blogs and sets the blog to the correct one
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
        let finalBlogs = blogsOutput.x.filter(blog => blog._id === viewBlog);
        setBlog(finalBlogs[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // runs the fetch blogs function
  useEffect(() => {
    fetchBlogs();
     // eslint-disable-next-line
  }, []);

  // removes the local storage item
  const removeLocal = () => {
    localStorage.removeItem('viewBlog');  
  }

  return (
    <>
      <Navbar/> 
      <div className="blogDetails">
  <h1>{blog.title}</h1>
  <p>Author: {blog.author}</p>
  <time>Last Updated: {blog.date}</time>
  {blog.img && <img src={blog.img} alt="Blog" />}
  <p>{blog.content}</p>
</div>
    </>
  );
};

export default Blog;
