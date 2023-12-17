import React, { useState } from 'react';
import EditBlogForm from './EditBlogForm'; // Make sure to provide the correct path

const BlogList = ({ blogs, fetchBlogs }) => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const deleteBlog = async (id) => {
    try {
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
      // Regardless of success or failure, fetch updated blogs
      fetchBlogs();
    }
  };

  const editBlog = (blog) => {
    setSelectedBlog(blog);
  };

  const cancelEdit = () => {
    setSelectedBlog(null);
  };

  const updateBlog = (updatedBlog) => {
    // Handle the updated blog, e.g., update your state
    // This function will be passed to the EditBlogForm component
    // and called after saving changes
    console.log('Blog updated:', updatedBlog);
    setSelectedBlog(null); // Exit edit mode

    // Fetch updated blogs
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
