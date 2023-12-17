import React, { useState, useEffect } from 'react';
import Header from '../Components/Navbar';
import BlogList2 from '../Components/BlogList2';

const AllPosts = () => {
  const [blog, setBlog] = useState({ title: '', content: '', author: '', img: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [blogs, setBlogs] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  useEffect(() => {
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
          setBlogs(blogsOutput.x); // Remove the filter
        } else {
          console.error('Failed to fetch blogs');
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchBlogs();
  }, []);

  return (
    <>
      <Header/>
      <BlogList2 blogs={blogs} />
    </>
  );
};

export default AllPosts;
