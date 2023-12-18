import React, { useState } from 'react';
import EditBlogForm from './EditBlogForm';

const BlogList = ({ blogs, fetchBlogs }) => {
  // useStates
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Function to delete a specific blog
  const deleteBlog = async (id) => {
    try {
      // Calls the function to dleete the desired user
      const response = await fetch(`http://localhost:9000/users/blog/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Failed to delete blog');
      }
    } catch (error) {
      console.error(error);
    } finally {
      //  Returns all of the blogs with the deleted blog
      fetchBlogs();
    }
  };

  //  Calls the edit blog function
  const editBlog = (blog) => {
    setSelectedBlog(blog);
  };

  //  Cancels the edit if the user chooses to
  const cancelEdit = () => {
    //Brings the user out of edit mode
    setSelectedBlog(null);
  };

  // Function to begin updating the blog
  const updateBlog = (updatedBlog) => {
    //Brings the user out of edit mode
    setSelectedBlog(null);
    //  Fetches and returns all of the blogs
    fetchBlogs();
  };

  return (
    <ul>
      {blogs.map((blog) => (
        <li key={blog._id}>
          {selectedBlog === blog ? (
            <EditBlogForm
              blog={selectedBlog}
              onUpdate={updateBlog}
              onCancel={cancelEdit}
            />
          ) : (
            <div>
              <h3>{blog.title}</h3>
              {blog.img && <img src={blog.img} alt="Blog" />}
              <p>{blog.content}</p>
              <p>Author: {blog.author}</p>
              <p>Date: {blog.date}</p>
              <button onClick={() => deleteBlog(blog._id)}>Delete</button>
              <button onClick={() => editBlog(blog)}>Edit</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default BlogList;
