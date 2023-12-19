import React, { useState } from 'react';
import EditBlogForm from './EditBlogForm';
import '../Styles/css/myPosts.css'; // Import the corresponding SCSS file

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
    setSelectedBlog(null);
    fetchBlogs();
  };

  return (
    <ul className="blogList">
      {blogs.map((blog) => (
        <li key={blog._id}>
          <div className="blogCard">
            {blog.img && <img src={blog.img} alt="Blog" />}
            <br />
            <h3>{blog.title}</h3>
            <br />
            <p>Author: {blog.author}</p>
            <br />
            <p>Date: {blog.date}</p>

            {selectedBlog === blog ? (
              <EditBlogForm blog={selectedBlog} onUpdate={updateBlog} onCancel={cancelEdit} />
            ) : (
              <>
                <div className="buttonsContainer">
                  <button className="editButton" onClick={() => editBlog(blog)}>
                    Edit
                  </button>
                  <button className="deleteButton" onClick={() => deleteBlog(blog._id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BlogList;
