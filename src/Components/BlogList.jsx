import React from 'react';

const BlogList = ({ blogs, onDelete }) => {
  const deleteBlog = async (title) => {
    try {
      const response = await fetch(`http://localhost:9000/users/blog/${title}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ul>
      {blogs.map((blog) => (
        <li key={blog._id}>
          <h3>{blog.title}</h3>
          {blog.img && <img src={blog.img} alt="Blog" />}
          <p>{blog.content}</p>
          <p>Author: {blog.author}</p>
          <button onClick={() => deleteBlog(blog._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default BlogList;
