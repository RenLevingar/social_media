import React from 'react';

// This componet creates the look for all of the blogs on the home page
const BlogList2 = ({ blogs, onDelete }) => {
  return (
    <ul>
      {blogs.map((blog) => (
        <li key={blog._id}>
          <h3>{blog.title}</h3>
          {blog.img && <img src={blog.img} alt="Blog" />}
          <p>{blog.content}</p>
          <p>Author: {blog.author}</p>
        </li>
      ))}
    </ul>
  );
};

export default BlogList2;
