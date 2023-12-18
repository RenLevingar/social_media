import React, { useState, useEffect } from 'react';
import Header from '../Components/Navbar';
import BlogList2 from '../Components/BlogList2';

const AllPosts = () => {
  // useStates
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // gets all of the blogs
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
          setBlogs(blogsOutput.x);
        } else {
          console.error('couldnt fetch blogs');
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
      <h1></h1>
      {/* outputs all of the blogs based off of the BlogList2 component */}
      <BlogList2 blogs={blogs} />
    </>
  );
};

export default AllPosts;
